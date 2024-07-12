import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversComponent } from './drivers.component';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DriversRoutingModule } from './drivers-routing.module';
import { DriversTableComponent } from './components/drivers-table/drivers-table.component';
import { DriversDialogComponent } from './components/drivers-dialog/drivers-dialog.component';

@NgModule({
  declarations: [
    DriversComponent,
    DriversTableComponent,
    DriversDialogComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    NgApexchartsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DriversRoutingModule,
  ],
})
export class DriversModule {}
