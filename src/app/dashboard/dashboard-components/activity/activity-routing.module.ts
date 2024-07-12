import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ActivityComponent } from './activity.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
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
export class ActivityRoutingModule {}
