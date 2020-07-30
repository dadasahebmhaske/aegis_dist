import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import  { CashFlowRegisterComponent } from './cash-flow-register/cash-flow-register.component';
import { PaymentCollectionsComponent } from './payment-collections/payment-collections.component';

const routes: Routes = [
  { path:'cash-flow-register',
  component:CashFlowRegisterComponent},
  { path:'payment-collections',
  component:PaymentCollectionsComponent},
];

export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  CashFlowRegisterComponent,  PaymentCollectionsComponent,
];