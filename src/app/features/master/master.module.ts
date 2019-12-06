import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './master-routing.module';

@NgModule({
  declarations: [componentArray],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ]
})
export class MasterModule { }
