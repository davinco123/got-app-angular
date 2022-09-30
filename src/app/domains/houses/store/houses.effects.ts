import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { House } from '../models/houses.model';
import * as HousesActions from './houses.actions';

@Injectable()
export class HousesEffects {
  constructor(private action$: Actions, private http: HttpClient) {}

  getHouses = createEffect(() =>
    this.action$.pipe(
      ofType(HousesActions.GET_HOUSES),
      switchMap(() => {
        return this.http.get<House[]>(
          environment.gotAPI + '/houses?page=1&pageSize=50'
        );
      }),
      map((housesData) => {
        return new HousesActions.SetHouses(housesData);
      })
    )
  );
}
