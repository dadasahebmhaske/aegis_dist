import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './master-routing.module';
import { UigridmasterDirective } from '../../core/directive/uigridmaster.directive';

@NgModule({
  declarations: [componentArray,UigridmasterDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports:[UigridmasterDirective]
})
export class MasterModule { }
