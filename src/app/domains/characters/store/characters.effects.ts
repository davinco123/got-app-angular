import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Character } from '../models/characters.model';
import { environment } from 'src/environments/environment';
import * as CharactersActions from './characters.actions';

@Injectable()
export class CharactersEffects {
  constructor(private action$: Actions, private http: HttpClient) {}

  getCharacters = createEffect(() =>
    this.action$.pipe(
      ofType(CharactersActions.GET_CHARACTERS),
      switchMap(() => {
        return this.http.get<Character[]>(
          environment.gotAPI + '/characters?page=1&pageSize=50'
        );
      }),
      map((charactersData) => {
        return new CharactersActions.SetCharacters(charactersData);
      })
    )
  );
}
