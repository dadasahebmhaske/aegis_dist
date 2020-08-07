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


const routes: Routes = [
  { path:'bank-account-details',
  component:BankAccountDetailsComponent},
  { path:'cash-flow-register',
  component:CashFlowRegisterComponent},
  { path:'payment-collections',
  component:PaymentCollectionsComponent},
  { path:'petty-cash-details-list',
  component:PettyCashDetailsListComponent},
  { path:'petty-cash-details',
  component:PettyCashDetailsComponent},
  { path:'cheque-and-dd-payment-status-list',
  component:ChequeAndDdPaymentStatusListComponent},
  { path:'cheque-and-dd-payment-status',
  component:ChequeAndDdPaymentStatusComponent},
  { path:'transfer-to-petty-cash-and-bank-account',
  component:TransferToPettyCashAndBankAccountComponent},
];

export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  BankAccountDetailsComponent,
  CashFlowRegisterComponent, 
   PaymentCollectionsComponent,
  PettyCashDetailsComponent,
  PettyCashDetailsListComponent,
  ChequeAndDdPaymentStatusListComponent,
  ChequeAndDdPaymentStatusComponent,
  TransferToPettyCashAndBankAccountComponent
];