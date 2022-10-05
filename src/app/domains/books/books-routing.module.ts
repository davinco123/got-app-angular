import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesPageGuard } from '../share/resources.guard';

import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksPageComponent } from './pages/book-pages/books-page.component';

const routes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
    canActivate: [ResourcesPageGuard],
    children: [
      {
        path: '',
        component: BooksListComponent,
      },
      {
        path: ':id',
        component: BooksDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
