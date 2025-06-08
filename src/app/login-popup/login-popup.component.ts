import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importiere FormsModule

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPopupComponent {
  username: string = '';
  password: string = '';
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
