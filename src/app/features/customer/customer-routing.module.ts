import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { TransferCustomerComponent } from './transfer-customer/transfer-customer.component';
import { TerminateCustomerComponent } from './terminate-customer/terminate-customer.component';
import { SvCreationPrintingComponent } from './sv-creation-printing/sv-creation-printing.component';
import { TransferCustomerInComponent } from './transfer-customer-in/transfer-customer-in.component';
import { CustomerWiseTransactionSummaryComponent } from './customer-wise-transaction-summary/customer-wise-transaction-summary.component';
import { CustomerWiseTransactionDetailsComponent } from './customer-wise-transaction-details/customer-wise-transaction-details.component';
import { ClientOutstandingAndDueDateSummaryComponent } from './client-outstanding-and-due-date-summary/client-outstanding-and-due-date-summary.component';
import { CustomerWiseProductDetailsComponent } from './customer-wise-product-details/customer-wise-product-details.component';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
const routes: Routes = [
  { path:'customer-wise-product-details',component:CustomerWiseProductDetailsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCWPD']}},
  { path:'customer-wise-transaction-summary',component:CustomerWiseTransactionSummaryComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCWTS']}},
  { path:'customer-wise-transaction-details',component:CustomerWiseTransactionDetailsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCWTD']}},
  { path:'client-outstanding-and-due-date-summary',component:ClientOutstandingAndDueDateSummaryComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCODD']}},
  { path:'customer-master', component:CustomerMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCUST']}},
  { path:'new-customer', component:NewCustomerComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCUST']} },
  { path:'update-customer', component:UpdateCustomerComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CCUST']} },
  { path:'transfer-customer', component:TransferCustomerComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CTRCO']}},
  { path:'terminate-customer',component:TerminateCustomerComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CRTDP']}},
  { path:'sv-creation-printing',component:SvCreationPrintingComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CSVCD']} },
  {path:'transfer-customer-in',component:TransferCustomerInComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['CTRCI']} },
   
]; 

export const routing=[RouterModule.forChild(routes)];
export const componentArray=[TransferCustomerInComponent,SvCreationPrintingComponent,TerminateCustomerComponent,TransferCustomerComponent,UpdateCustomerComponent,CustomerMasterComponent,NewCustomerComponent,  CustomerWiseTransactionSummaryComponent,
  CustomerWiseTransactionDetailsComponent,
  CustomerWiseProductDetailsComponent,
  ClientOutstandingAndDueDateSummaryComponent];