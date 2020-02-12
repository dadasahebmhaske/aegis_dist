import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { routing, compArray } from './stock-routing.module';
import { UigridstockDirective } from '../../core/directive/uigridstock.directive';
import { StockService } from './stock.service';
import { CustomerService } from '../customer/customer.service';

@NgModule({
  declarations: [compArray, UigridstockDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  providers: [StockService, CustomerService],
  exports: [UigridstockDirective]
})
export class StockModule { }
