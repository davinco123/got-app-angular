import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, NgbModule],
  providers: [],
  exports: [CommonModule, HttpClientModule, NgbModule],
})
export class ShareModule {}
