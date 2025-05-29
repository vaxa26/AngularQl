import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { BuchService } from './service/buch.service';

interface Art {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  searchInput = '';
  buecher: any[] = [];
  rating: number | null = null;
  art: string = '';

  constructor(
    private dialog: MatDialog,
    private buchservice: BuchService,
  ) {}

  title = 'AngularQl';
  minRating = 0;
  arts: Art[] = [
    { value: '1', viewValue: 'Epub' },
    { value: '2', viewValue: 'Paperback' },
    { value: '3', viewValue: 'AGA' },
  ];
  openLogin(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '500px',
      height: '400px',
      data: { name: 'Login' },
    });
  }

  search() {
    const input = this.searchInput.trim();
    const isIsbn = /^\d{9}(\d|X)$/.test(input);

    const suchkriterien: any = isIsbn ? { isbn: input } : { titel: input };

    if (this.rating) {
      suchkriterien.rating = this.rating;
    }

    if (this.art) {
      suchkriterien.art = this.art;
    }

    this.buchservice.getBuecher(suchkriterien).subscribe((result) => {
      this.buecher = result.data.buecher;
    });
  }
}
