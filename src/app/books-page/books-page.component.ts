import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BuchService } from '../service/buch.service';
@Component({
  selector: 'app-books-page',
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent implements OnInit {
  buecher: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private buchservice: BuchService,
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
  }
}
