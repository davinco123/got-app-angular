import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../characters/models/characters.model';

@Pipe({
  name: 'characterFilter',
})
export class CharacterFilterPipe implements PipeTransform {
  transform(characters: Character[], searchText: string): Character[] {
    if (!characters) {
      return [];
    }
    if (!searchText) {
      return characters;
    }

    searchText = searchText.toLocaleLowerCase();

    return characters.filter((character) => {
      return (
        character.name.toLocaleLowerCase().includes(searchText) ||
        character.gender.toLocaleLowerCase().includes(searchText) ||
        character.culture.toLocaleLowerCase().includes(searchText) ||
        character.titles.find((title) => {
          return title.toLocaleLowerCase().includes(searchText);
        }) ||
        character.aliases.find((alias) => {
          return alias.toLocaleLowerCase().includes(searchText);
        })
      );
    });
  }
}
