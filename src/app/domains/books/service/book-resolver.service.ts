import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/books.model';
import { BooksService } from './books.service';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  constructor(private booksService: BooksService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Book | Observable<Book> | Promise<Book> {
    return this.booksService.getBook(route.params['id']);
  }
}
