import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'buecher', component: BooksPageComponent },
  { path: 'add', component: AddBookPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
