import { Component, OnInit } from '@angular/core';
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
export class BooksListComponent implements OnInit {
  public bookList$: Observable<Book[]>;
  public isLoading = true;
  public searchText = new FormControl();

  constructor(private booksService: BooksService) {}

  public ngOnInit(): void {
    this.bookList$ = this.booksService.booksList$;

    this.searchText.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        if (!value) {
          this.booksService.booksList = [];
        }
        this.booksService.getBooks(value);
        this.isLoading = false;
      });
  }
}
