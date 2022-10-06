import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NameAndId } from 'src/app/domains/share/models/share.model';
import { Book } from '../../models/books.model';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent implements OnInit {
  public book: Book;
  public id = '';
  public showmore = false;
  public povCharacters: NameAndId[];
  public characters: NameAndId[];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') !== this.id) {
        this.id = params.get('id');
      }

      this.booksService.getBook(this.id).subscribe((bData) => {
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

  public showMore(): void {
    this.showmore = !this.showmore;
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
