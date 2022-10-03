import { Component, Input } from '@angular/core';
import { Book } from '../../../models/books.model';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss'],
})
export class BooksItemComponent {
  @Input() public bookList: Book[];
}
