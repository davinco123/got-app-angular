import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module';
import { CharactersItemComponent } from './components/characters-list/characters-item/characters-item.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';
import { CharactersDetailComponent } from './components/characters-detail/characters-detail.component';
import { CharactersRoutingModule } from './characters-routing.module';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersPageComponent,
    CharactersItemComponent,
    CharactersDetailComponent,
  ],
  imports: [ShareModule, CharactersRoutingModule],
  providers: [],
})
export class CharactersModule {}
