import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'picture',
    loadChildren: () => import('./picture/picture.module').then( m => m.PicturePageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./delete/delete.module').then( m => m.DeletePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
