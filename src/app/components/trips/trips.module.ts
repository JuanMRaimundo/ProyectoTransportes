import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';

import { TripsTableComponent } from './trips-table/trips-table.component';
import { TripsDialogComponent } from './trips-dialog/trips-dialog.component';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TripsComponent, TripsTableComponent, TripsDialogComponent],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule,
  ],
  exports: [TripsComponent],
})
export class TripsModule {}
