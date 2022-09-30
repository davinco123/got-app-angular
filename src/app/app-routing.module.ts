import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./domains/books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./domains/characters/characters.module').then(
        (m) => m.CharactersModule
      ),
  },
  {
    path: 'houses',
    loadChildren: () =>
      import('./domains/houses/houses.module').then((m) => m.HousesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
