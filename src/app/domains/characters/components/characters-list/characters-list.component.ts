import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';
import { Character } from '../../models/characters.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public searchText = '';
  public characterList: Character[];
  private storeSubscription: Subscription;

  constructor(private charactersStore: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.charactersStore
      .select('characters')
      .subscribe((characterData) => {
        this.characterList = characterData.characters;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
