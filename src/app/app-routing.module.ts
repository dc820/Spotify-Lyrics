import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './about/about.component';
import { SongComponent } from './song/song.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: SongComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
