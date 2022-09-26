import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/resources',
    pathMatch: 'full',
  },
  {
    // path: 'resources',
    // loadChildren: () =>
    //   import('./domains/resources/resources.module').then(
    //     (m) => m.ResourcesModule
    //   ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
