import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {routing} from "./auth.routing";
import { AuthComponent } from './auth.component';
import { DistributorAuthentificationComponent } from './distributor-authentification/distributor-authentification.component';
import { DistributorProfileComponent } from './distributor-profile/distributor-profile.component';
import { CreateAdministratorAccountComponent } from './create-administrator-account/create-administrator-account.component';

@NgModule({
  imports: [
    CommonModule,

    routing,
  ],
  declarations: [ AuthComponent, DistributorAuthentificationComponent, DistributorProfileComponent, CreateAdministratorAccountComponent]
})
export class AuthModule { }
