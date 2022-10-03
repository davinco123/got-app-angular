import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
  of,
  forkJoin,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../../books/models/books.model';
import { Character } from '../models/characters.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  public page = 1;
  public charactersList: Character[] = [];
  public charactersList$ = this.charactersSubject.asObservable();
  public charactersListLength = 10000;

  constructor(private http: HttpClient) {
    this.getNextCharacters();
    this.charactersSubject.next(this.charactersList);
  }

  public getCharacter(id: string): Observable<Character> {
    return this.http
      .get<Character>(environment.gotAPI + `/characters/${id}`)
      .pipe(
        switchMap((characterData) => {
          if (characterData.father) {
            return this.getNameFromCharacter(
              characterData,
              'father',
              characterData.father
            );
          } else {
            return of(characterData);
          }
        }),
        switchMap((characterData) => {
          if (characterData.mother) {
            return this.getNameFromCharacter(
              characterData,
              'mother',
              characterData.mother
            );
          } else {
            return of(characterData);
          }
        }),
        switchMap((characterData) => {
          if (characterData.spouse) {
            return this.getNameFromCharacter(
              characterData,
              'spouse',
              characterData.spouse
            );
          } else {
            return of(characterData);
          }
        }),
        switchMap((characterData) => {
          if (characterData.books.length > 0) {
            return forkJoin([
              ...characterData.books.map((b) => this.getName(b)),
            ]).pipe(
              map((values) => {
                characterData.books = values;
                return characterData;
              })
            );
          } else {
            return of(characterData);
          }
        }),
        switchMap((characterData) => {
          if (characterData.povBooks.length > 0) {
            return forkJoin([
              ...characterData.povBooks.map((b) => this.getName(b)),
            ]).pipe(
              map((values) => {
                characterData.povBooks = values;
                return characterData;
              })
            );
          } else {
            return of(characterData);
          }
        }),
        switchMap((characterData) => {
          if (characterData.allegiances.length > 0) {
            return forkJoin([
              ...characterData.allegiances.map((b) => this.getName(b)),
            ]).pipe(
              map((values) => {
                characterData.allegiances = values;
                return characterData;
              })
            );
          } else {
            return of(characterData);
          }
        })
      );
  }

  public getCharacters(): void {
    this.http
      .get<Character[]>(
        environment.gotAPI + `/characters?page=${this.page}&pageSize=50`
      )
      .pipe(
        map((charactersData) => {
          charactersData.map(
            (character) => (character.url = character.url.replace(/\D/g, ''))
          );
          return charactersData;
        })
      )
      .subscribe((charactersData) => {
        this.charactersList = [...this.charactersList, ...charactersData];
        this.charactersSubject.next(this.charactersList);
        this.page += 1;
      });
  }

  public loadMore(): void {
    if (this.getNextCharacters()) {
      this.charactersSubject.next(this.charactersList);
    }
  }

  public getNextCharacters(): boolean {
    if (this.charactersList.length >= this.charactersListLength) {
      return false;
    }
    this.getCharacters();
    return true;
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<Book>(url)
      .pipe(map((b) => `${b.name}${url.replace(/\D/g, '')}`));
  }

  private getNameFromCharacter(
    characterData: Character,
    type: string,
    url: string
  ): Observable<Character> {
    return this.http.get<Character>(url).pipe(
      map((c) => {
        characterData[type] = `${c.name}${characterData[type].replace(
          /\D/g,
          ''
        )}`;
        return characterData;
      })
    );
  }
}
