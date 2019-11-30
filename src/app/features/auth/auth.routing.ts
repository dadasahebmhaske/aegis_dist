
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";
import { DistributorAuthentificationComponent } from './distributor-authentification/distributor-authentification.component';
import { DistributorProfileComponent } from './distributor-profile/distributor-profile.component';
import { CreateAdministratorAccountComponent } from './create-administrator-account/create-administrator-account.component';


export const routes:Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot/forgot.module#ForgotModule'
  },
  {
    path: 'locked',
    loadChildren: './locked/locked.module#LockedModule'
  },
  {
    path: 'distributor-authentification',
    component: DistributorAuthentificationComponent
  },
  {
    path: 'distributor-profile',
    component: DistributorProfileComponent
  },
  {
    path: 'create-administrator-account',
    component: CreateAdministratorAccountComponent
  }
];   

export const routing = RouterModule.forChild(routes);
