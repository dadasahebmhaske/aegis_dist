import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,compArray } from './order-routing.module';
import { UigridordersDirective } from '../../core/directive/uigridorders.directive';

@NgModule({
  declarations: [compArray,UigridordersDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  exports:[UigridordersDirective]
})
export class OrderModule { }
