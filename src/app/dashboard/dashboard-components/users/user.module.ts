import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserComponent,
    UserTableComponent,
    UserDialogComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    NgApexchartsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
