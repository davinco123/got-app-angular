import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty, isArray } from 'lodash';
import { BehaviorSubject, Observable, map, switchMap, forkJoin } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Book } from '../../books/models/books.model';
import { Character } from '../models/characters.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  public page = 1;
  public charactersList: Character[] = [];
  public charactersListLength = 10000;

  constructor(private http: HttpClient) {}

  public get charactersList$(): Observable<Character[]> {
    return this.charactersSubject.asObservable();
  }

  public getCharacter(id: string): Observable<Character> {
    return this.http
      .get<Character>(environment.gotAPI + `/characters/${id}`)
      .pipe(
        switchMap((cData) => {
          const keyArrays = [
            'father',
            'mother',
            'spouse',
            'allegiances',
            'books',
            'povBooks',
          ];

          const data = {};

          for (const [key, value] of Object.entries(cData)) {
            if (keyArrays.includes(key) && !isEmpty(value)) {
              data[key] = value;
            }
          }

          return forkJoin(
            Object.keys(data).map((k) => {
              if (isArray(data[k])) {
                return forkJoin(
                  data[k].map((v: string) => this.getName(v))
                ).pipe(
                  map((res: string[]) => {
                    cData[k] = res;
                  })
                );
              } else {
                return forkJoin([this.getName(data[k])]).pipe(
                  map((res) => (cData[k] = res[0]))
                );
              }
            })
          ).pipe(map(() => cData));
        })
      );
  }

  public getCharacters(name?: string): void {
    this.http
      .get<Character[]>(`${environment.gotAPI}/characters?pageSize=50`, {
        params: {
          page: name ? '' : this.page,
          name: name ? name : '',
        },
      })
      .pipe(
        map((cData) => {
          cData.map(
            (character) => (character.url = character.url.replace(/\D/g, ''))
          );
          return cData;
        })
      )
      .subscribe((cData) => {
        if (!name) {
          this.charactersSubject.next(
            (this.charactersList = [...this.charactersList, ...cData])
          );
        } else {
          this.charactersSubject.next((this.charactersList = cData));
          this.page = 1;
        }
      });
  }

  public loadMore(): void {
    if (this.charactersList.length < this.charactersListLength) {
      this.page++;
      this.getCharacters();
    }
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<Book>(url)
      .pipe(map((b) => `${b.name}${url.replace(/\D/g, '')}`));
  }
}
