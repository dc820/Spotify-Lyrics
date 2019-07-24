import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'results', component: ResultsComponent, data: { animation: 'ResultsPage' }},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
