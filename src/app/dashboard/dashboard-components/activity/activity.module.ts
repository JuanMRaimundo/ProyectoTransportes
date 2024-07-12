import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../../../demo-flexy-module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivityComponent } from './activity.component';
import { ActivitysTabComponent } from './components/activitys-tab/activitys-tab.component';
import { ActivitysDialogComponent } from './components/activitys-dialog/activitys-dialog.component';
import { ActivityRoutingModule } from './activity-routing.module';

@NgModule({
  declarations: [
    ActivityComponent,
    ActivitysTabComponent,
    ActivitysDialogComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    NgApexchartsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ActivityRoutingModule,
  ],
  exports: [ActivityComponent],
})
export class ActivityModule {}
