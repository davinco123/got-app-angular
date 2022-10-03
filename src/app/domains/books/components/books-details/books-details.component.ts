import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NameAndId } from 'src/app/domains/characters/models/characters.model';
import { Book } from '../../models/books.model';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent {
  public book: Book;
  public povCharacters: NameAndId[];
  public characters: NameAndId[];

  constructor(route: ActivatedRoute) {
    route.data.subscribe(() => {
      this.book = route.snapshot.data.book;

      this.povCharacters = this.book.povCharacters.map((v) => {
        return this.createNameAndId(v);
      });

      this.characters = this.book.characters.map((v) => {
        return this.createNameAndId(v);
      });
    });
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
