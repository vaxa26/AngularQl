import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importiere FormsModule
import { KeycloakService } from '../service/keycloack.service';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPopupComponent {
  isVisible = true;
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private keycloakService: KeycloakService) {}

  async login() {
    this.error = null;
    try {
      const success = await this.keycloakService.login(
        this.username,
        this.password,
      );
      if (success) {
        this.close();
        console.log('Login erfolgreich');
      } else {
        this.error =
          'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.';
      }
    } catch (err) {
      console.error('Login-Fehler:', err);
      this.error =
        'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
    }
  }
  close() {
    this.isVisible = false;
  }
  isHidden = true;

  togglePasswordVisibility(): void {
    this.isHidden = !this.isHidden;
  }
}
