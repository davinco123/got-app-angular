import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { ShareModule } from '../share/share.module';
import { HousesListComponent } from './components/houses-list/houses-list.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';
import { HousesEffects } from './store/houses.effects';
import { HousesItemComponent } from './components/houses-list/houses-item/houses-item.component';

@NgModule({
  declarations: [HousesListComponent, HousesPageComponent, HousesItemComponent],
  imports: [
    ShareModule,
    EffectsModule.forFeature([HousesEffects]),
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
