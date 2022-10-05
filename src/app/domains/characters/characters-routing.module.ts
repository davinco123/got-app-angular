import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { never } from 'rxjs';

import { CharactersDetailComponent } from './components/characters-detail/characters-detail.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';
import { CharacterResolver } from './services/character-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CharactersPageComponent,
    children: [
      {
        path: '',
        component: CharactersListComponent,
      },
      {
        path: ':id',
        component: CharactersDetailComponent,
        resolve: { character: CharacterResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
