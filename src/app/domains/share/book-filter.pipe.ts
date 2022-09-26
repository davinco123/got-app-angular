import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../books/models/books.model';

@Pipe({
  name: 'bookFilter',
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], searchText: string): Book[] {
    if (!books) {
      return [];
    }
    if (!searchText) {
      return books;
    }
    searchText = searchText.toLocaleLowerCase();

    return books.filter((book) => {
      return (
        book.name.toLocaleLowerCase().includes(searchText) ||
        book.publisher.toLocaleLowerCase().includes(searchText)
      );
    });
  }
}
