import { Action } from '@ngrx/store';

import { Book } from '../models/books.model';

export const GET_BOOKS = '[Books] Get Books';
export const SET_BOOKS = '[Books] Set Books';

export class GetBooks implements Action {
  readonly type = GET_BOOKS;
}

export class SetBooks implements Action {
  readonly type = SET_BOOKS;

  constructor(public payload: Book[]) {}
}

export type BookActionsType = GetBooks | SetBooks;
