import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorPageComponent,
      },
    ]),
  ],
})
export class ErrorModule {}
