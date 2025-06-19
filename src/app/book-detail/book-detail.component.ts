/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuchService } from '../service/buch.service';

@Component({
  selector: 'app-buch-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
})
export class BuchDetailsComponent implements OnInit {
  buch: any;

  constructor(
    private route: ActivatedRoute,
    private buchservice: BuchService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buchservice.getBuchById(id).subscribe({
        next: (result) => {
          this.buch = result?.data?.buch;
        },
        error: (err) => {
          console.error('Fehler beim Laden des Buchs:', err);
        },
      });
    }
  }
}
