import * as fromBooks from '../domains/books/store/books.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  books: fromBooks.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  books: fromBooks.booksReducer,
};
