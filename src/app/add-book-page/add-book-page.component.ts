import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbDropdownModule,
  NgbRatingConfig,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BuchService } from '../service/buch.service';

@Component({
  selector: 'app-add-book-page',
  imports: [
    FormsModule,
    NgbRatingModule,
    NgClass,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './add-book-page.component.html',
  styleUrl: './add-book-page.component.scss',
})
export class AddBookPageComponent {
  isbnInput = '';
  isbnRaw = '';
  isTitle = '';
  isUntertitel = '';
  rating = 0;
  buchart: 'EPUB' | 'PAPERBACK' | 'HARDCOVER' | null = null;
  selectArt(art: 'EPUB' | 'PAPERBACK' | 'HARDCOVER') {
    this.buchart = art;
  }
  isPrice: number | null = null;
  isSale: number | null = null;
  lieferbar: boolean = false;
  model?: NgbDateStruct;
  tagInput: string = '';
  ishomepage = 'https://';
  verfuegbareSchlagwoerter: string[] = [
    'JAVASCRIPT',
    'TYPESCRIPT',
    'JAVA',
    'PYTHON',
  ];
  schlagwoerter: string[] = [];
  abbildungen: { beschriftung: string; contentType: string }[] = [
    { beschriftung: '', contentType: '' },
  ];
  errorMsg: string[] = [];

  onIsbnChange(value: string) {
    const digits = value.replace(/[^0-9X]/gi, '').substring(0, 13);
    this.isbnRaw = digits;

    let formatted = digits;

    if (digits.length > 0) {
      formatted = digits.slice(0, 3);
    }
    if (digits.length > 3) {
      formatted += '-' + digits.slice(3, 4);
    }
    if (digits.length > 4) {
      formatted += '-' + digits.slice(4, 7);
    }
    if (digits.length > 7) {
      formatted += '-' + digits.slice(7, 12);
    }
    if (digits.length > 12) {
      formatted += '-' + digits.slice(12);
    }

    this.isbnInput = formatted;
  }

  toggleSchlagwort(wort: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked && !this.schlagwoerter.includes(wort)) {
      this.schlagwoerter.push(wort);
    } else if (!checked) {
      this.schlagwoerter = this.schlagwoerter.filter((w) => w !== wort);
    }
  }

  isHomepageValid(): boolean {
    if (!this.ishomepage) return false;

    const pattern = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    return pattern.test(this.ishomepage);
  }

  constructor(
    private buchService: BuchService,
    config: NgbRatingConfig,
  ) {
    config.max = 5;
  }

  createBook() {
    const input = {
      isbn: this.isbnRaw || undefined,
      rating: this.rating || undefined,
      art: this.buchart || undefined,
      preis: this.isPrice ?? undefined,
      rabatt: this.isSale ?? undefined,
      lieferbar: this.lieferbar,
      datum: this.model
        ? `${this.model.year}-${String(this.model.month).padStart(2, '0')}-${String(this.model.day).padStart(2, '0')}`
        : undefined,
      homepage: this.ishomepage || undefined,
      schlagwoerter:
        this.schlagwoerter.length > 0 ? this.schlagwoerter : undefined,
      titel: {
        titel: this.isTitle,
        untertitel: this.isUntertitel || undefined,
      },
      abbildungen:
        this.abbildungen.length > 0
          ? this.abbildungen.map((a) => ({
              beschriftung: a.beschriftung,
              contentType: a.contentType,
            }))
          : undefined,
    };

    this.buchService.createBuch(input).subscribe({
      next: (res) => {
        alert('✅ Buch erfolgreich erstellt!');
        console.log(res.data?.create.id);
      },
      error: (err) => {
        const messages = err?.graphQLErrors?.[0]?.message?.split(',') ?? [];
        this.errorMsg = messages.map((msg: string) => msg.trim());
      },
    });
  }
}
