import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, updateCharacter } from '../../models/characters.model';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss'],
})
export class CharactersDetailComponent {
  public character: Character;
  public updateCharacterInfo: updateCharacter;

  constructor(public route: ActivatedRoute) {
    route.data.subscribe(() => {
      this.character = route.snapshot.data.character;
      const keyArrays = [
        'father',
        'mother',
        'spouse',
        'allegiances',
        'books',
        'povBooks',
      ];

      const data: any = {};

      for (const [key, value] of Object.entries(this.character)) {
        if (keyArrays.includes(key)) {
          if (!Array.isArray(value)) {
            data[key] = this.createNameAndId(value);
          } else {
            data[key] = value.map((v) => this.createNameAndId(v));
          }
        }
      }
      this.updateCharacterInfo = data;
    });
  }

  private createNameAndId(value: string) {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
