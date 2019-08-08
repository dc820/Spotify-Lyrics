import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ResultsComponent } from './results/results.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [

  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'user', component: AuthComponent },
  { path: 'results', component: ResultsComponent, data: { animation: 'ResultsPage' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
