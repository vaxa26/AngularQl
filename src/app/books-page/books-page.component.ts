import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BuchService } from '../service/buch.service';
import { KeycloakService } from '../service/keycloack.service';
@Component({
  selector: 'app-books-page',
  imports: [CommonModule, MatTableModule],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent implements OnInit {
  isAdmin: boolean = false;

  buecher: any[] = [];

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
    'titel',
    'rating',
    'art',
    'preis',
    'lieferbar',
    'datum',
    'homepage',
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.buchservice.getBuecher(params).subscribe((result) => {
        this.buecher = result.data.buecher;
      });
    });
    this.isAdmin = this.keyclockservice.hasRole('admin');
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
  bearbeiten(_t17: any) {
    throw new Error('Method not implemented.');
  }
}
