import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

import { Character } from '../characters/models/characters.model';

@Pipe({
  name: 'urlToName',
})
export class UrlToNamePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(value: string): Observable<string> {
    if (!value) {
      return null;
    }
    return this.http
      .get<Character>(
        environment.gotAPI + `/characters/${value.replace(/[^0-9]/g, '')}`
      )
      .pipe(
        map((character) => {
          return character.name || character.aliases[0];
        })
      );
  }
}
