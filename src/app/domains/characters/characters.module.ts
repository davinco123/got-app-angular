import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShareModule } from '../share/share.module';
import { CharactersItemComponent } from './components/characters-list/characters-item/characters-item.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersPageComponent,
    CharactersItemComponent,
  ],
  imports: [
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: CharactersPageComponent,
      },
    ]),
  ],
  providers: [],
})
export class CharactersModule {}
