import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing, compArray } from './order-routing.module';
import { UigridordersDirective } from '../../core/directive/uigridorders.directive';
import { OrderService } from './order.service';
import { CustomerService } from '../customer/customer.service';
import { StockService } from '../stock/stock.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
@NgModule({
  declarations: [compArray, UigridordersDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [OrderService, CustomerService, StockService, RoleAccessGuard],
  exports: [UigridordersDirective]
})
export class OrderModule { }
