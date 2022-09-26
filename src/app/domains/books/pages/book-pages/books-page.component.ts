import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import * as BooksActions from '../../store/books.actions';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit {
  constructor(private booksStore: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.booksStore.dispatch(new BooksActions.GetBooks());
  }
}
