import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import  { CashFlowRegisterComponent } from './cash-flow-register/cash-flow-register.component';
import { PaymentCollectionsComponent } from './payment-collections/payment-collections.component';
import { PettyCashDetailsComponent } from './petty-cash-details/petty-cash-details.component';
import { PettyCashDetailsListComponent } from './petty-cash-details-list/petty-cash-details-list.component';
import { ChequeAndDdPaymentStatusComponent } from './cheque-and-dd-payment-status/cheque-and-dd-payment-status.component';
import { ChequeAndDdPaymentStatusListComponent } from './cheque-and-dd-payment-status-list/cheque-and-dd-payment-status-list.component';
import { TransferToPettyCashAndBankAccountComponent } from './transfer-to-petty-cash-and-bank-account/transfer-to-petty-cash-and-bank-account.component';
import { BankAccountDetailsComponent } from './bank-account-details/bank-account-details.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
const routes: Routes = [
  { path:'bank-account-details',component:BankAccountDetailsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FBACD']}},
  { path:'cash-flow-register',component:CashFlowRegisterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FCFPC']}},
  { path:'expenses-list',component:ExpensesListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FEXPE']}},
  { path:'expenses',component:ExpensesComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FEXPE']}},
  { path:'payment-collections',component:PaymentCollectionsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FCFPC']}},
  { path:'petty-cash-details-list',component:PettyCashDetailsListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FPCBD']}},
  { path:'petty-cash-details',component:PettyCashDetailsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FPCBD']}},
  { path:'cheque-and-dd-payment-status-list',component:ChequeAndDdPaymentStatusListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FCDPS']}},
  { path:'cheque-and-dd-payment-status',component:ChequeAndDdPaymentStatusComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FCDPS']}},
  { path:'transfer-to-petty-cash-and-bank-account',component:TransferToPettyCashAndBankAccountComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['FTPCB']}},
];

export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  BankAccountDetailsComponent,
  CashFlowRegisterComponent,
  ExpensesListComponent,
  ExpensesComponent, 
   PaymentCollectionsComponent,
  PettyCashDetailsComponent,
  PettyCashDetailsListComponent,
  ChequeAndDdPaymentStatusListComponent,
  ChequeAndDdPaymentStatusComponent,
  TransferToPettyCashAndBankAccountComponent
];