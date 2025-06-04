import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BuchService } from '../service/buch.service';

interface Art {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-page',
  imports: [
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    NgForOf,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  searchInput = '';
  buecher: any[] = [];
  rating: number | null = null;
  art: string = '';

  constructor(
    private buchservice: BuchService,
    private router: Router,
  ) {}

  title = 'AngularQl';
  minRating = 0;
  arts: Art[] = [
    { value: '1', viewValue: 'Epub' },
    { value: '2', viewValue: 'Paperback' },
    { value: '3', viewValue: 'AGA' },
  ];

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

    if (!input && !this.rating && !this.art) return;

    this.router.navigate(['/buecher'], { queryParams: suchkriterien });

    this.buchservice.getBuecher(suchkriterien).subscribe((result) => {
      this.buecher = result.data.buecher;
    });
  }
}
