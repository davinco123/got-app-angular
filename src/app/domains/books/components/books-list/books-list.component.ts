import { Component } from '@angular/core';
import { Book } from '../../models/books.model';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
} from 'rxjs';
import { BooksService } from '../../service/books.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  public bookList$: Observable<Book[]>;
  public searchText = new FormControl();

  constructor(booksService: BooksService) {
    this.bookList$ = booksService.booksList$;

    this.searchText.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        if (value) {
          booksService.getBooks(value);
        } else {
          booksService.getSave();
        }
      });
  }
}
