import { Component } from '@angular/core';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent {
  constructor(booksService: BooksService) {
    booksService.getBooks();
  }
}
