import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BuchService } from '../service/buch.service';

interface Art {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  searchInput = '';
  buecher: any[] = [];
  rating: number | null = null;
  art = '';

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
  geheZuAddSeite() {
  this.router.navigate(['/add']);
}
}
