import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-popup',
  imports: [MatDialogContent, MatDialogActions, MatFormField, MatLabel, MatIcon, MatButtonModule, MatInputModule],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginPopupComponent {
close() {
throw new Error('Method not implemented.');
}
login() {
throw new Error('Method not implemented.');
}
  isHidden = true;

  togglePasswordVisibility(): void {
    this.isHidden = !this.isHidden;
  }
}
