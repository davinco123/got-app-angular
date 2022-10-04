import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../../characters/models/characters.model';
import { Book } from '../models/books.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  public booksList: Book[] = [];
  public saveList: Book[] = [];
  public booksList$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getBooks();
  }

  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.gotAPI}/books/${id}`).pipe(
      switchMap((bookData) => {
        const array: any[] = [];
        if (bookData.characters.length > 0) array.push(bookData.characters);
        if (bookData.povCharacters.length > 0)
          array.push(bookData.povCharacters);

        return forkJoin([...array.flat(2).map((v) => this.getName(v))]).pipe(
          map((resData) => {
            if (bookData.characters.length > 0) {
              bookData.characters = resData.slice(
                0,
                bookData.characters.length
              );
              resData = resData.slice(
                bookData.characters.length,
                resData.length
              );
            }
            if (bookData.povCharacters.length > 0) {
              bookData.povCharacters = resData.slice(
                0,
                bookData.povCharacters.length
              );
              resData = resData.slice(
                bookData.povCharacters.length,
                resData.length
              );
            }
            return bookData;
          })
        );
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
        map((booksData) => {
          booksData.map((book) => (book.url = book.url.replace(/\D/g, '')));
          return booksData;
        })
      )
      .subscribe((data) => {
        if (!name) {
          this.booksSubject.next(
            (this.booksList = [...this.saveList, ...data])
          );
          this.saveList = this.booksList;
        } else {
          this.booksSubject.next((this.booksList = data));
        }
      });
  }

  public getSave(): void {
    this.booksSubject.next((this.booksList = this.saveList));
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<Character>(url)
      .pipe(map((c) => `${c.name || c.aliases[0]}${c.url.replace(/\D/g, '')}`));
  }
}
