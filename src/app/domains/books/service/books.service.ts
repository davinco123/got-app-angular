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
import { Character } from '../../characters/models/characters.model';
import { Book } from '../models/books.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  public booksList: Book[] = [];
  public booksList$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(environment.gotAPI + `/books/${id}`).pipe(
      map((bookData) => {
        return bookData;
      }),
      switchMap((bookData) => {
        if (bookData.povCharacters.length > 0) {
          return forkJoin([
            ...bookData.povCharacters.map((characterUrl) =>
              this.getCharacter(characterUrl)
            ),
          ]).pipe(
            map((value) => {
              bookData.povCharacters = value;
              return bookData;
            })
          );
        } else {
          return of(bookData);
        }
      }),
      switchMap((bookData) => {
        if (bookData.characters.length > 0) {
          return forkJoin([
            ...bookData.characters.map((characterUrl) =>
              this.getCharacter(characterUrl)
            ),
          ]).pipe(
            map((value) => {
              bookData.characters = value;
              return bookData;
            })
          );
        } else {
          return of(bookData);
        }
      })
    );
  }

  public getBooks(): void {
    this.http
      .get<Book[]>(environment.gotAPI + `/books?page=1&pageSize=20`)
      .pipe(
        map((booksData) => {
          booksData.map((book) => (book.url = book.url.replace(/\D/g, '')));
          return booksData;
        })
      )
      .subscribe((data) => {
        this.booksList = data;
        this.booksSubject.next(this.booksList);
      });
  }

  private getCharacter(url: string): Observable<string> {
    return this.http
      .get<Character>(url)
      .pipe(map((c) => `${c.name || c.aliases[0]}${c.url.replace(/\D/g, '')}`));
  }
}
