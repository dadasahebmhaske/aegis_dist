import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing ,compArray} from './settings-routing.module';
import { UigridsettingDirective } from '../../core/directive/uigridsetting.directive';
import { OrderService } from '../order/order.service';
import { CustomerService } from '../customer/customer.service';
import { StockService } from '../stock/stock.service';
import { BsDatepickerModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [compArray,UigridsettingDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [OrderService, CustomerService, StockService],
  exports: [UigridsettingDirective]
})
export class SettingsModule { }
