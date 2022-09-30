import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/books.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  public booksList: Book[] = [];
  public booksList$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getBooks(): void {
    this.http
      .get<Book[]>(environment.gotAPI + `/books?page=1&pageSize=20`)
      .subscribe((data) => {
        this.booksList = data;
        this.booksSubject.next(this.booksList);
      });
  }
}
