import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';
import { CarouselModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    CarouselModule.forRoot(),
    FormsModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
