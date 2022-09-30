import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Character } from '../../models/characters.model';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  public searchText = '';
  public characterList$: Observable<Character[]>;

  constructor(private charactersService: CharactersService) {
    this.characterList$ = charactersService.charactersList$;
  }

  onScrollingFinished() {
    this.charactersService.loadMore();
  }
}
