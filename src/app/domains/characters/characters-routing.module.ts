import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageGuard } from '../share/auth.guard';
import { ResourcesPageGuard } from '../share/resources.guard';

import { CharactersDetailComponent } from './components/characters-detail/characters-detail.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersPageComponent,
    canActivate: [ResourcesPageGuard],
    children: [
      {
        path: '',
        component: CharactersListComponent,
      },
      {
        path: ':id',
        component: CharactersDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
