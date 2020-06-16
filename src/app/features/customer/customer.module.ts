import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { routing, componentArray } from './customer-routing.module';
import { UigridcustomerDirective } from '../../core/directive/uigridcustomer.directive';
import { CustomerService } from './customer.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { OrderService } from '@app/features/order/order.service';
import { SettingService } from '@app/features/settings/setting.service';

@NgModule({
  declarations: [componentArray, UigridcustomerDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [CustomerService,OrderService,SettingService],
  exports: [UigridcustomerDirective]
})
export class CustomerModule { }
