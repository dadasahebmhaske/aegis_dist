import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
const routes: Routes = [
  {
    path:'customer-master',
    component:CustomerMasterComponent
  },
  {
    path:'new-customer',
    component:NewCustomerComponent
  },
  {
    path:'update-customer',
    component:UpdateCustomerComponent
  }

];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CustomerRoutingModule { }
export const routing=[RouterModule.forChild(routes)];
export const componentArray=[UpdateCustomerComponent,CustomerMasterComponent,NewCustomerComponent];