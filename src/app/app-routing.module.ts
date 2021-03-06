import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'addAuthor', loadChildren: () => import('./add-author/routing-modules/add-author-routing.module')
      .then(mod => mod.AddAuthorRoutingModule)},
  {path: 'addAuthor/:id-author', loadChildren: () => import('./add-author/routing-modules/add-author-routing.module')
      .then(mod => mod.AddAuthorRoutingModule)},
  {path: 'editGenres', loadChildren: () => import('./genres/routing-modules/edit-genres-routing.module')
      .then(mod => mod.EditGenresRoutingModule)},
  {path: '**', loadChildren: () => import('./pagenotfound/routing-modules/pagenotfound-routing.module')
      .then(mod => mod.PagenotfoundRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
