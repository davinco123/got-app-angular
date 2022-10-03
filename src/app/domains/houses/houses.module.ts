import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module';
import { HousesListComponent } from './components/houses-list/houses-list.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';
import { HousesItemComponent } from './components/houses-list/houses-item/houses-item.component';
import { HousesDetailComponent } from './components/houses-detail/houses-detail.component';
import { HousesRoutingModule } from './houses-routing.module';

@NgModule({
  declarations: [
    HousesListComponent,
    HousesPageComponent,
    HousesItemComponent,
    HousesDetailComponent,
  ],
  imports: [ShareModule, HousesRoutingModule],
  providers: [],
})
export class HousesModule {}
