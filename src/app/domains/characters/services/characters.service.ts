import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../models/characters.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  public page = 1;
  public charactersList: Character[] = [];
  public charactersList$ = this.charactersSubject.asObservable();
  public charactersListLength = 10000;

  constructor(private http: HttpClient) {
    this.getNextChracters();
    this.charactersSubject.next(this.charactersList);
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
    if (this.getNextChracters()) {
      this.charactersSubject.next(this.charactersList);
    }
  }

  getNextChracters(): boolean {
    if (this.charactersList.length >= this.charactersListLength) {
      return false;
    }
    this.getCharacters();
    return true;
  }
}
