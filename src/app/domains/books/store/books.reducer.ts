import { Book } from '../models/books.model';
import * as BooksActions from './books.actions';

export interface State {
  books: Book[];
}

const initialState: State = {
  books: [],
};

export function booksReducer(
  state: State = initialState,
  action: BooksActions.BookActionsType
) {
  switch (action.type) {
    case BooksActions.SET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };

    default:
      return state;
  }
}
