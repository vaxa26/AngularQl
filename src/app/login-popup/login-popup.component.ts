import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importiere FormsModule
import { MatDialogRef } from '@angular/material/dialog';
import { KeycloakService } from '../service/keycloack.service';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPopupComponent {
  showLoginPopup = true;
  username = '';
  password = '';
  error: string | null = null;
  authService: unknown;
  isAdmin = false;

  constructor(
    private keycloakService: KeycloakService,
    private dialogRef: MatDialogRef<LoginPopupComponent>,
    private cdr: ChangeDetectorRef,
  ) {}

  async login() {
    this.error = null;
    try {
      const success = await this.keycloakService.login(
        this.username,
        this.password,
      );
      if (success) {
        this.dialogRef.close({ success: true });
        console.log('Login erfolgreich');
      } else {
        this.error =
          'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.';
        this.cdr.detectChanges();
      }
    } catch (err) {
      console.error('Login-Fehler:', err);
      this.error =
        'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
      this.cdr.detectChanges();
    }
    this.isAdmin = this.keycloakService.hasRole('admin');
    console.log('Ist Admin:', this.isAdmin);
  }
  close() {
    this.dialogRef.close();
  }

  isHidden = true;

  togglePasswordVisibility(): void {
    this.isHidden = !this.isHidden;
  }
}
