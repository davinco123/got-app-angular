import { Character } from '../models/characters.model';
import * as CharactersActions from './characters.actions';

export interface State {
  characters: Character[];
}

const initialState: State = {
  characters: [],
};

export function charactersReducer(
  state: State = initialState,
  action: CharactersActions.CharactersActionsType
) {
  switch (action.type) {
    case CharactersActions.SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
}
