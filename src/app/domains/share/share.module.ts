import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookFilterPipe } from './book-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollTrackerDirective } from './scroll-tracker.directive';
import { CharacterFilterPipe } from './character-filter.pipe';
import { HousesFilterPipe } from './house-filter.pipe';

@NgModule({
  declarations: [
    BookFilterPipe,
    ScrollTrackerDirective,
    CharacterFilterPipe,
    HousesFilterPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    BookFilterPipe,
    FormsModule,
    ReactiveFormsModule,
    ScrollTrackerDirective,
    CharacterFilterPipe,
    HousesFilterPipe,
  ],
})
export class ShareModule {}
