import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { TransferCustomerComponent } from './transfer-customer/transfer-customer.component';
import { TerminateCustomerComponent } from './terminate-customer/terminate-customer.component';
import { SvCreationPrintingComponent } from './sv-creation-printing/sv-creation-printing.component';
import { TransferCustomerInComponent } from './transfer-customer-in/transfer-customer-in.component';

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
  },
  {
    path:'transfer-customer',
    component:TransferCustomerComponent
  },
  {
    path:'terminate-customer',
    component:TerminateCustomerComponent
  },
  {
    path:'sv-creation-printing',
    component:SvCreationPrintingComponent
  },
  {
    path:'transfer-customer-in',
    component:TransferCustomerInComponent
  },
   
]; 

export const routing=[RouterModule.forChild(routes)];
export const componentArray=[TransferCustomerInComponent,SvCreationPrintingComponent,TerminateCustomerComponent,TransferCustomerComponent,UpdateCustomerComponent,CustomerMasterComponent,NewCustomerComponent];