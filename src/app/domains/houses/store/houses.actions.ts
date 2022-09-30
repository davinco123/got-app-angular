import { Action } from '@ngrx/store';
import { House } from '../models/houses.model';

export const GET_HOUSES = '[Houses] Get Houses';
export const SET_HOUSES = '[Houses] Set Houses';

export class GetHouses implements Action {
  readonly type = GET_HOUSES;
}

export class SetHouses implements Action {
  readonly type = SET_HOUSES;

  constructor(public payload: House[]) {}
}

export type HousesActionsType = GetHouses | SetHouses;
