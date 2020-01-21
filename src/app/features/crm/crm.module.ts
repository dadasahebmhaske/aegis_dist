import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { routing,componentArray } from './crm-routing.module';
import { UigridcrmDirective } from '../../core/directive/uigridcrm.directive';

@NgModule({
  declarations: [componentArray,UigridcrmDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports:[UigridcrmDirective]
})
export class CrmModule { }
