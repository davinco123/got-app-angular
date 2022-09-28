import { Action } from '@ngrx/store';

import { Character } from '../models/characters.model';

export const GET_CHARACTERS = '[Characters] Get Characters';
export const SET_CHARACTERS = '[Characters] Set Characters';

export class GetCharacters implements Action {
  readonly type = GET_CHARACTERS;
}

export class SetCharacters implements Action {
  readonly type = SET_CHARACTERS;

  constructor(public payload: Character[]) {}
}

export type CharactersActionsType = GetCharacters | SetCharacters;
