/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { BuchService } from '../service/buch.service';

interface Art {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgForOf, FormsModule, NgbRatingModule, NgClass, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  searchInput = '';
  buecher: any[] = [];
  rating: number | null = null;
  art = '';
  lieferbarChecked = false;
  notlieferbarChecked = false;
  buchId = '';
  isAdmin = false;
  errorMsgId = '';
  errorMsgSearch = '';

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
      const lieferbarParam = params['lieferbar'];
      if (lieferbarParam === 'true') {
        this.lieferbarChecked = true;
      } else if (lieferbarParam === 'false') {
        this.notlieferbarChecked = true;
      }
      if (
        this.searchInput ||
        this.rating !== null ||
        this.art ||
        this.lieferbarChecked ||
        this.notlieferbarChecked
      ) {
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
  onLieferbarChange() {
    if (this.lieferbarChecked) {
      this.notlieferbarChecked = false;
    }
  }

  onNichtLieferbarChange() {
    if (this.notlieferbarChecked) {
      this.lieferbarChecked = false;
    }
  }
  searchId() {
    const id = this.buchId.trim();
    if (!id) {
      this.errorMsgId = 'Bitte eine ID eingeben.';
      return;
    }

    this.buchservice.getBuchById(id).subscribe({
      next: (res) => {
        if (res?.data?.buch) {
          this.errorMsgId = '';
          this.router.navigate(['/buecher', id]);
        }
      },
      error: () => {
        this.errorMsgId = 'Kein Buch mit dieser ID gefunden.';
      },
    });
  }

  search() {
    const input = this.searchInput.trim();
    const isIsbn = /^(\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-[\dXx])$/.test(input);
    const suchkriterien: any = {};
    const queryParams: any = {};
    this.errorMsgSearch = ';';

    let direktsuche = false;

    if (input) {
      if (isIsbn) {
        suchkriterien.isbn = input;
        queryParams.isbn = input;
      } else {
        suchkriterien.titel = input;
        queryParams.titel = input;
      }
      direktsuche = true; // 👈 hier wird direktsuche korrekt gesetzt
    }

    if (!direktsuche) {
      if (typeof this.rating === 'number' && !isNaN(this.rating)) {
        suchkriterien.rating = this.rating;
        queryParams.rating = this.rating;
      }
      if (this.art) {
        suchkriterien.art = this.art;
        queryParams.art = this.art;
      }
      if (this.lieferbarChecked) {
        suchkriterien.lieferbar = true;
        queryParams.lieferbar = 'true';
      } else if (this.notlieferbarChecked) {
        suchkriterien.lieferbar = false;
        queryParams.lieferbar = 'false';
      }
    }

    this.buchservice.getBuecher(suchkriterien).subscribe({
      next: (result) => {
        let buecher = result?.data?.buecher ?? [];

        if (!direktsuche && typeof this.rating === 'number') {
          buecher = buecher.filter((b) => b.rating === this.rating);
        }

        this.buecher = buecher;

        this.errorMsgSearch = '';
        this.router.navigate(['/buecher'], { queryParams });
      },
      error: (error) => {
        console.error('Apollo Error:', error);
        this.buecher = [];
        this.errorMsgSearch = 'Keine Bücher gefunden.';
      },
    });
  }
  geheZuAddSeite() {
    this.router.navigate(['/add']);
  }
}
