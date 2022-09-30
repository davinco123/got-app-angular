import * as fromBooks from '../domains/books/store/books.reducer';
import * as fromCharacters from '../domains/characters/store/characters.reducer';
import * as fromHouses from '../domains/houses/store/houses.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  books: fromBooks.State;
  characters: fromCharacters.State;
  houses: fromHouses.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  books: fromBooks.booksReducer,
  characters: fromCharacters.charactersReducer,
  houses: fromHouses.housesReducer,
};
