import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BooksPageComponent } from './pages/book-pages/books-page.component';

const routes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
