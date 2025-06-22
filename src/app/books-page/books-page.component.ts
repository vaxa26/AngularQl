/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BuchService } from '../service/buch.service';
import { KeycloakService } from '../service/keycloack.service';
@Component({
  selector: 'app-books-page',
  imports: [CommonModule, MatTableModule, RouterModule, NgbPagination],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent implements OnInit {
  isAdmin = false;
  buecher: any[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(
    private route: ActivatedRoute,
    private buchservice: BuchService,
    private router: Router,
    private keyclockservice: KeycloakService,
  ) {}

  getStars(rating: number): any[] {
    return new Array(rating);
  }

  displayedColumns: string[] = [
    'id',
    'isbn',
    'titel',
    'rating',
    'art',
    'lieferbar',
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const suchkriterien: any = {};

      const ratingStr = params['rating'];
      const parsedRating = parseInt(ratingStr, 10);

      if (!isNaN(parsedRating)) {
        suchkriterien.rating = parsedRating;
      } else {
        delete suchkriterien.rating;
      }

      if (params['lieferbar'] === 'true') {
        suchkriterien.lieferbar = true;
      } else if (params['lieferbar'] === 'false') {
        suchkriterien.lieferbar = false;
      }

      if (params['art']) {
        suchkriterien.art = params['art'];
      }

      if (params['isbn']) {
        suchkriterien.isbn = params['isbn'];
      }

      if (params['titel']) {
        suchkriterien.titel = params['titel'];
      }

      console.log('Suchkriterien an GraphQL:', suchkriterien);

      this.buchservice.getBuecher(suchkriterien).subscribe((result) => {
        this.buecher = result.data.buecher;
      });
    });
    this.isAdmin = this.keyclockservice.hasRole('admin');
  }

  getPagedBuecher(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.buecher.slice(startIndex, startIndex + this.pageSize);
  }

  homebutton() {
    this.router.navigate(['/home']);
  }

  entfernen(buch: any) {
    if (!buch?.id) return;

    this.buchservice.deleteBuch(buch.id).subscribe({
      next: () => {
        this.buecher = this.buecher.filter((b) => b.id !== buch.id);
      },
      error: (err) => {
        console.error('fehler beim löschen', err);
      },
    });
  }
}
