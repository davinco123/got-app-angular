import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';

import { Character } from '../../models/characters.model';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  public searchText = new FormControl();
  public characterList$: Observable<Character[]>;

  constructor(private charactersService: CharactersService) {
    this.characterList$ = charactersService.charactersList$;

    this.searchText.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        if (!value) {
          this.charactersService.charactersList = [];
        }
        charactersService.getCharacters(value);
      });
  }

  public onScrollingFinished() {
    this.charactersService.loadMore();
  }
}
