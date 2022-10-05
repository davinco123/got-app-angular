import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthPageGuard } from '../share/auth.guard';

import { ShareModule } from '../share/share.module';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  declarations: [AuthPageComponent, AuthLoginComponent],
  imports: [
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthPageComponent,
        canActivate: [AuthPageGuard],
        children: [
          {
            path: '',
            component: AuthLoginComponent,
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class AuthModule {}
