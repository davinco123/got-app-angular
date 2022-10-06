import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
  forkJoin,
  tap,
  of,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { Character } from '../../characters/models/characters.model';
import { Book } from '../models/books.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  public booksList: Book[] = [];

  constructor(private http: HttpClient) {}

  public get booksList$(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.gotAPI}/books/${id}`).pipe(
      switchMap((bData) => {
        const keyArrays = ['characters', 'povCharacters'];

        const data = {};

        for (const [key, value] of Object.entries(bData)) {
          if (keyArrays.includes(key) && !isEmpty(value)) {
            data[key] = value;
          }
        }

        if (!isEmpty(data)) {
          return forkJoin(
            Object.keys(data).map((k) => {
              return forkJoin(data[k].map((v: string) => this.getName(v))).pipe(
                tap((res: string[]) => {
                  bData[k] = res;
                })
              );
            })
          ).pipe(map(() => bData));
        } else {
          return of(bData);
        }
      })
    );
  }

  public getBooks(name?: string): void {
    this.http
      .get<Book[]>(`${environment.gotAPI}/books?page=1&pageSize=20`, {
        params: {
          name: name ? name : '',
        },
      })
      .pipe(
        tap((b) => {
          b.forEach((book) => (book.url = book.url.replace(/\D/g, '')));
        })
      )
      .subscribe((data) => {
        if (!name) {
          this.booksSubject.next(
            (this.booksList = [...this.booksList, ...data])
          );
        } else {
          this.booksSubject.next((this.booksList = data));
        }
      });
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<Character>(url)
      .pipe(map((c) => `${c.name || c.aliases[0]}${c.url.replace(/\D/g, '')}`));
  }
}
