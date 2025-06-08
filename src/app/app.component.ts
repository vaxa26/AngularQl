import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { LoginPopupComponent } from './login-popup/login-popup.component';

interface Art {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private dialog: MatDialog,
    private router: RouterModule,
  ) {}

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '500px',
      height: '400px',
      data: { name: 'Login' },
    });
  }
}
