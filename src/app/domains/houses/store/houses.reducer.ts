import { House } from '../models/houses.model';

import * as HousesActions from './houses.actions';

export interface State {
  houses: House[];
}

const initialState: State = {
  houses: [],
};

export function housesReducer(
  state: State = initialState,
  action: HousesActions.HousesActionsType
) {
  switch (action.type) {
    case HousesActions.SET_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };
    default:
      return state;
  }
}
