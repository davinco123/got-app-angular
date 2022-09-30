import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { ShareModule } from '../share/share.module';
import { CharactersItemComponent } from './components/characters-list/characters-item/characters-item.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';
import { CharactersEffects } from './store/characters.effects';

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
    EffectsModule.forFeature([CharactersEffects]),
  ],
  providers: [],
})
export class CharactersModule {}
