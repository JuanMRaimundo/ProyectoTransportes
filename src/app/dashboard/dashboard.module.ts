import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module';
import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './dashboard-components/sales/sales.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { ProductComponent } from './dashboard-components/product/product.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { ActivityModule } from './dashboard-components/activity/activity.module';
import { UserModule } from './dashboard-components/users/user.module';
import { DriversModule } from './dashboard-components/drivers/drivers.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SalesComponent,
    ProductComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    HttpClientModule,
    ActivityModule,
    UserModule,
    DriversModule,
  ],
  exports: [DashboardComponent, SalesComponent, ProductComponent],
})
export class DashboardModule {}
