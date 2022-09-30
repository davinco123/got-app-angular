import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookFilterPipe } from './book-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollTrackerDirective } from './scroll-tracker.directive';

@NgModule({
  declarations: [BookFilterPipe, ScrollTrackerDirective],
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
  ],
})
export class ShareModule {}
