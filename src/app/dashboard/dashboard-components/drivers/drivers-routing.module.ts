import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { DriversComponent } from './drivers.component';

const routes: Routes = [
  {
    path: '',
    component: DriversComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
