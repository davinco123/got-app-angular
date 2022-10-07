import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';

import { NameAndId } from 'src/app/domains/share/models/share.model';
import { Book } from '../../models/books.model';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent implements OnInit {
  @ViewChild('showbtn') showbtn: ElementRef;
  public book: Book;
  public povCharacters: NameAndId[];
  public characters: NameAndId[];
  private charactersSubject = new BehaviorSubject<NameAndId[]>([]);

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = '';

      if (params.get('id') !== id) {
        id = params.get('id');
      }

      this.booksService.getBook(id).subscribe((bData) => {
        this.book = bData;

        this.povCharacters = this.book.povCharacters.map((v) => {
          return this.createNameAndId(v);
        });

        this.characters = this.book.characters.map((v) => {
          return this.createNameAndId(v);
        });

        this.charactersSubject.next(this.characters);
      });
    });
  }

  public get characters$(): Observable<NameAndId[]> {
    return this.charactersSubject.asObservable();
  }

  public getMoreCharacters(): void {
    if (!isEmpty(this.booksService.charactersList)) {
      this.booksService.getMoreCharacter().subscribe((value) => {
        this.characters = [
          ...this.characters,
          ...value.map((v) => this.createNameAndId(v)),
        ];
        this.charactersSubject.next(this.characters);

        if (isEmpty(this.booksService.charactersList)) {
          this.renderer.setStyle(this.showbtn.nativeElement, 'display', 'none');
        }
      });
    }
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
