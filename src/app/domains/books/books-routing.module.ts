import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksPageComponent } from './pages/book-pages/books-page.component';
import { BookResolver } from './service/book-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
    children: [
      {
        path: '',
        component: BooksListComponent,
      },
      {
        path: ':id',
        component: BooksDetailsComponent,
        resolve: { book: BookResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
