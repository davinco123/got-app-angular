import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module';
import { BooksPageComponent } from './pages/book-pages/books-page.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksItemComponent } from './components/books-list/books-item/books-item.component';

@NgModule({
  declarations: [BooksPageComponent, BooksListComponent, BooksDetailsComponent, BooksItemComponent],
  imports: [ShareModule, BooksRoutingModule],
  providers: [],
})
export class BooksModule {}
