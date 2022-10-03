import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, NameAndId } from '../../models/characters.model';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss'],
})
export class CharactersDetailComponent {
  public character: Character;
  public father: NameAndId;
  public mother: NameAndId;
  public spouse: NameAndId;
  public books: NameAndId[];
  public povBooks: NameAndId[];
  public allegiances: NameAndId[];

  constructor(route: ActivatedRoute) {
    route.data.subscribe(() => {
      this.character = route.snapshot.data.character;

      this.father = this.createNameAndId(this.character.father);

      this.mother = this.createNameAndId(this.character.mother);

      this.spouse = this.createNameAndId(this.character.spouse);

      this.books = this.character.books.map((v) => {
        return this.createNameAndId(v);
      });

      this.povBooks = this.character.povBooks.map((v) => {
        return this.createNameAndId(v);
      });

      this.allegiances = this.character.allegiances.map((v) => {
        return this.createNameAndId(v);
      });
    });
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
