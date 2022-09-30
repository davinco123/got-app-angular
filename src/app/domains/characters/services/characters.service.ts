import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../models/characters.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  public page = 1;
  public character: Character;
  public characterName = '';
  public charactersList: Character[] = [];
  public charactersList$ = this.charactersSubject.asObservable();
  public charactersListLength = 10000;

  constructor(private http: HttpClient) {
    this.getNextCharacters();
    this.charactersSubject.next(this.charactersList);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(environment.gotAPI + `/characters/${id}`);
  }

  getCharacters(): void {
    this.http
      .get<Character[]>(
        environment.gotAPI + `/characters?page=${this.page}&pageSize=50`
      )
      .subscribe((data) => {
        this.charactersList = [...this.charactersList, ...data];
        this.charactersSubject.next(this.charactersList);
        this.page += 1;
      });
  }

  loadMore(): void {
    if (this.getNextCharacters()) {
      this.charactersSubject.next(this.charactersList);
    }
  }

  getNextCharacters(): boolean {
    if (this.charactersList.length >= this.charactersListLength) {
      return false;
    }
    this.getCharacters();
    return true;
  }

  getCharacterName(id: string): void {
    this.http
      .get<Character>(environment.gotAPI + `/characters/${id}`)
      .pipe(
        take(1),
        map((character) => {
          return character.name || character.aliases[0];
        })
      )
      .subscribe((characterName) => {
        this.characterName = characterName;
        console.log(this.characterName);
      });
  }
}
