import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NameAndId } from 'src/app/domains/characters/models/characters.model';
import { Book } from '../../models/books.model';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent implements OnDestroy {
  public book: Book;
  public id = '';
  public povCharacters: NameAndId[];
  public characters: NameAndId[];
  private routeSub: Subscription;

  constructor(route: ActivatedRoute, booksService: BooksService) {
    this.routeSub = route.paramMap.subscribe((params) => {
      if (params.get('id') !== this.id) {
        this.id = params.get('id');
      }

      booksService.getBook(this.id).subscribe((bData) => {
        this.book = bData;

        this.povCharacters = this.book.povCharacters.map((v) => {
          return this.createNameAndId(v);
        });

        this.characters = this.book.characters.map((v) => {
          return this.createNameAndId(v);
        });
      });
    });
  }

  public ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
