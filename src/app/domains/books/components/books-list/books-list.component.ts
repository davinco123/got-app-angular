import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../../models/books.model';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  public bookList: Book[];
  public searchText = '';
  private storeSubscription: Subscription;

  constructor(private booksStore: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.booksStore
      .select('books')
      .subscribe((booksData) => {
        this.bookList = booksData.books;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
