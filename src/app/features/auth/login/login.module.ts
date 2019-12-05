import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CarouselModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms"
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    CarouselModule.forRoot(),
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
