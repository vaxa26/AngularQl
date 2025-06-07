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
import { MatSliderModule } from '@angular/material/slider';
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
    MatSliderModule,
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
  arts: Art[] = [
    { value: 'EPUB', viewValue: 'Epub' },
    { value: 'PAPERBACK', viewValue: 'Paperback' },
    { value: 'HARDCOVER', viewValue: 'Hardcover' },
  ];

  search() {
    const input = this.searchInput.trim();
    const isIsbn = /^(\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-[\dXx])$/.test(input);

    const suchkriterien: any = {};

    if (input) {
      if (isIsbn) {
        suchkriterien.isbn = input;
      } else {
        suchkriterien.titel = input;
      }
    }

    if (this.rating !== null && this.rating !== undefined) {
      suchkriterien.rating = this.rating;
    }

    if (this.art) {
      suchkriterien.art = this.art;
    }

    this.router.navigate(['/buecher'], { queryParams: suchkriterien });

    this.buchservice.getBuecher(suchkriterien).subscribe((result) => {
      this.buecher = result.data.buecher;
    });
  }
}
