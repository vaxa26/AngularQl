import { NgIf } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { KeycloakService } from './service/keycloack.service';

interface Art {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isAdmin: boolean = false;
  menuOpen: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: RouterModule,
    private snackBar: MatSnackBar,
    private keyclockservice: KeycloakService,
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
  ) {
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.keyclockservice.hasRole('admin');
    console.log('Bin ich Admin?', this.isAdmin);
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '500px',
      height: '400px',
      data: { name: 'Login' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success === true) {
        this.snackBar.open('Login war erfolgreich', 'OK', {
          duration: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });

    this.isAdmin = this.keyclockservice.hasRole('admin');
    console.log('Ist Admin:', this.isAdmin);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.isAdmin = false;
    window.location.reload();
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }

  hinzufuegen() {
    // Logik hier
  }
}
