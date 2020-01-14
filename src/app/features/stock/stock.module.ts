import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing, compArray } from './stock-routing.module';


@NgModule({
  declarations: [compArray],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ]
})
export class StockModule { }
