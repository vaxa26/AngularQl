import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  art: string = '';

  constructor(
    private buchservice: BuchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const rawRating = params['rating'];
      const ratingNum =
        rawRating !== undefined ? parseInt(rawRating, 10) : null;

      this.rating = Number.isInteger(ratingNum) ? ratingNum : null;
      this.searchInput = params['titel'] || '';
      this.art = params['art'] || '';

      if (this.searchInput || this.rating !== null || this.art) {
        this.search();
      }
    });
  }

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

    if (typeof this.rating === 'number' && !isNaN(this.rating)) {
      suchkriterien.rating = this.rating; // 100 % number
    }
    if (this.art) {
      suchkriterien.art = this.art;
    }

    this.router.navigate(['/buecher'], { queryParams: suchkriterien });

    this.buchservice.getBuecher(suchkriterien).subscribe({
      next: (result) => {
        if (result?.data?.buecher) {
          this.buecher = result.data.buecher;
        } else {
          console.warn('Keine Bücher gefunden oder leere Antwort:', result);
          this.buecher = [];
        }
      },
      error: (error) => {
        console.error('Apollo Error:', error);
      },
    });
  }
  geheZuAddSeite() {
    this.router.navigate(['/add']);
  }
}
