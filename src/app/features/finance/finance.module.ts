import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './finance-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ChannelPartnerService } from '@app/features/master/channel-partner/channel-partner.service';
import { CustomerService } from '../customer/customer.service';
import { UigridfinanceDirective } from '@app/core/directive/uigridfinance.directive';
import { OrderService } from '../order/order.service';
import { StockService } from '../stock/stock.service';
import {FinanceService } from './finance.service';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';

@NgModule({
  declarations: [componentArray,UigridfinanceDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    BsDatepickerModule.forRoot(),
  ],
  exports:[UigridfinanceDirective],
  providers:[ChannelPartnerService,CustomerService,OrderService,StockService,FinanceService,RoleAccessGuard]
})
export class FinanceModule { }

