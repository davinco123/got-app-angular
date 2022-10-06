import { Component, OnInit } from '@angular/core';
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
export class CharactersListComponent implements OnInit {
  public searchText = new FormControl();
  public isLoading = true;
  public characterList$: Observable<Character[]>;

  constructor(private charactersService: CharactersService) {}

  public ngOnInit(): void {
    this.characterList$ = this.charactersService.charactersList$;

    this.searchText.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        if (!value) {
          this.charactersService.charactersList = [];
          this.charactersService.page = 1;
        }
        this.charactersService.getCharacters(value);
        this.isLoading = false;
      });
  }

  public onScrollingFinished() {
    this.charactersService.loadMore();
  }
}
