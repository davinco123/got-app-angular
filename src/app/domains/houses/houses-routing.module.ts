import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesPageGuard } from '../share/guards/resources.guard';
import { HousesDetailComponent } from './components/houses-detail/houses-detail.component';
import { HousesListComponent } from './components/houses-list/houses-list.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

const routes: Routes = [
  {
    path: '',
    component: HousesPageComponent,
    canActivate: [ResourcesPageGuard],
    children: [
      {
        path: '',
        component: HousesListComponent,
      },
      {
        path: ':id',
        component: HousesDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousesRoutingModule {}
