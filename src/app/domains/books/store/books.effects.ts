import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs';

import * as BooksActions from './books.actions';
import { environment } from 'src/environments/environment';
import { Book } from '../models/books.model';

@Injectable()
export class BooksEffects {
  constructor(private action$: Actions, private http: HttpClient) {}

  getBooks = createEffect(() =>
    this.action$.pipe(
      ofType(BooksActions.GET_BOOKS),
      switchMap(() => {
        return this.http.get<Book[]>(
          environment.gotAPI + '/books?page=1&pageSize=50'
        );
      }),
      map((booksData) => {
        return new BooksActions.SetBooks(booksData);
      })
    )
  );
}
