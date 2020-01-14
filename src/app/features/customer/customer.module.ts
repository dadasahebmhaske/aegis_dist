import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { routing,componentArray } from './customer-routing.module';


@NgModule({
  declarations: [componentArray],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ]
})
export class CustomerModule { }
