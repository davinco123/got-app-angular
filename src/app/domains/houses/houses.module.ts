import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShareModule } from '../share/share.module';
import { HousesListComponent } from './components/houses-list/houses-list.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';
import { HousesItemComponent } from './components/houses-list/houses-item/houses-item.component';

@NgModule({
  declarations: [HousesListComponent, HousesPageComponent, HousesItemComponent],
  imports: [
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: HousesPageComponent,
      },
    ]),
  ],
  providers: [],
})
export class HousesModule {}
