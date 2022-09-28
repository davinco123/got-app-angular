import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import * as CharactersActions from '../../store/characters.actions';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss'],
})
export class CharactersPageComponent implements OnInit {
  constructor(private charactersStore: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.charactersStore.dispatch(new CharactersActions.GetCharacters());
  }
}
