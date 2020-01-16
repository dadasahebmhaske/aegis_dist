import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { routing,componentArray } from './customer-routing.module';
import { UigridcustomerDirective } from '../../core/directive/uigridcustomer.directive';

@NgModule({
  declarations: [componentArray,UigridcustomerDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  exports:[UigridcustomerDirective]
})
export class CustomerModule { }
