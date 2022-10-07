import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { HeaderNavbarComponent } from './components/header-navbar/header-navbar.component';
import { HeaderPageComponent } from './pages/header-page/header-page.component';

@NgModule({
  declarations: [HeaderNavbarComponent, HeaderPageComponent],
  imports: [
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: HeaderPageComponent,
      },
    ]),
  ],
})
export class HeaderModule {}
