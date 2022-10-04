import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../../books/models/books.model';
import { Character } from '../models/characters.model';
import { isEmpty } from 'lodash';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  public page = 1;
  public charactersList: Character[] = [];
  public saveList: Character[] = [];
  public charactersListLength = 10000;

  constructor(private http: HttpClient) {
    this.getCharacters();
  }

  public get charactersList$(): Observable<Character[]> {
    return this.charactersSubject.asObservable();
  }

  public getCharacter(id: string): Observable<Character> {
    return this.http
      .get<Character>(environment.gotAPI + `/characters/${id}`)
      .pipe(
        switchMap((characterData) => {
          const array: any[] = [];

          Object.keys(characterData).map((cKey: string) => {
            const cValue = characterData[cKey];

            if (!isEmpty(cValue)) {
              switch (cKey) {
                case 'father':
                case 'mother':
                case 'spouse':
                case 'allegiances':
                case 'books':
                case 'povBooks':
                  array.push(cValue);
                  break;
                default:
                  return;
              }
            }
          });

          return forkJoin([...array.flat(2).map((v) => this.getName(v))]).pipe(
            map((resData) => {
              if (characterData.father) {
                characterData.father = resData[0];
                resData = resData.slice(1, resData.length);
              }
              if (characterData.mother) {
                characterData.mother = resData[0];
                resData = resData.slice(1, resData.length);
              }
              if (characterData.spouse) {
                characterData.spouse = resData[0];
                resData = resData.slice(1, resData.length);
              }
              if (characterData.allegiances.length > 0) {
                characterData.allegiances = resData.slice(
                  0,
                  characterData.allegiances.length
                );
                resData = resData.slice(
                  characterData.allegiances.length,
                  resData.length
                );
              }
              if (characterData.books.length > 0) {
                characterData.books = resData.slice(
                  0,
                  characterData.books.length
                );
                resData = resData.slice(
                  characterData.books.length,
                  resData.length
                );
              }
              if (characterData.povBooks.length > 0) {
                characterData.povBooks = resData.slice(
                  0,
                  characterData.povBooks.length
                );
                resData = resData.slice(
                  characterData.povBooks.length,
                  resData.length
                );
              }

              return characterData;
            })
          );
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
        map((charactersData) => {
          charactersData.map(
            (character) => (character.url = character.url.replace(/\D/g, ''))
          );
          return charactersData;
        })
      )
      .subscribe((charactersData) => {
        if (!name) {
          this.charactersSubject.next(
            (this.charactersList = [...this.saveList, ...charactersData])
          );
          this.saveList = this.charactersList;
          this.page++;
        } else {
          this.charactersSubject.next((this.charactersList = charactersData));
        }
      });
  }

  public loadMore(): void {
    if (this.charactersList.length < this.charactersListLength) {
      this.getCharacters();
      this.charactersSubject.next(this.charactersList);
    }
  }

  public getSave(): void {
    this.charactersSubject.next((this.charactersList = this.saveList));
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<Book>(url)
      .pipe(map((b) => `${b.name}${url.replace(/\D/g, '')}`));
  }
}
