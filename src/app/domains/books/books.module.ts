import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module';
import { BooksPageComponent } from './pages/book-pages/books-page.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
import { BooksItemComponent } from './components/books-list/books-item/books-item.component';

@NgModule({
  declarations: [
    BooksPageComponent,
    BooksListComponent,
    BooksDetailComponent,
    BooksItemComponent,
  ],
  imports: [ShareModule],
  providers: [],
})
export class AppModule {}
