import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, updateCharacter } from '../../models/characters.model';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss'],
})
export class CharactersDetailComponent implements OnDestroy {
  public character: Character;
  public id = '';
  public updateCharacterInfo: updateCharacter;
  private routeSub: Subscription;

  constructor(
    public route: ActivatedRoute,
    charactersService: CharactersService
  ) {
    this.routeSub = route.paramMap.subscribe((params) => {
      if (params.get('id') !== this.id) {
        this.id = params.get('id');
      }

      charactersService.getCharacter(this.id).subscribe((cData) => {
        this.character = cData;
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
    });
  }

  public ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private createNameAndId(value: string) {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
