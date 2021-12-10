import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'addAuthor', loadChildren: () => import('./add-author/routing-modules/add-author-routing.module')
      .then(mod => mod.AddAuthorRoutingModule)},
  {path: 'editGenres', loadChildren: () => import('./genres/routing-modules/edit-genres-routing.module')
      .then(mod => mod.EditGenresRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
