import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { routing, compArray } from './stock-routing.module';
import { UigridstockDirective } from '../../core/directive/uigridstock.directive';

@NgModule({
  declarations: [compArray,UigridstockDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  exports:[UigridstockDirective]
})
export class StockModule { }
