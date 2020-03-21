import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefillBookingListComponent } from './refill-booking-list/refill-booking-list.component';
import { RefillBookingComponent } from './refill-booking/refill-booking.component';
import { CashMemoAndRefillDeliveryComponent } from './cash-memo-and-refill-delivery/cash-memo-and-refill-delivery.component';
import { DeliverRefillComponent } from './deliver-refill/deliver-refill.component';
import { UndeliverRefillComponent } from './undeliver-refill/undeliver-refill.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { UndeliveredOrdersComponent } from './undelivered-orders/undelivered-orders.component';
import { DeliveryManWiseRefillOrderSummaryComponent } from './delivery-man-wise-refill-order-summary/delivery-man-wise-refill-order-summary.component';
import { AreaWiseRefillOrderSummaryComponent } from './area-wise-refill-order-summary/area-wise-refill-order-summary.component';
import { CustomerWiseTransactionsComponent } from './customer-wise-transactions/customer-wise-transactions.component';
import  { CashFlowRegisterComponent } from './cash-flow-register/cash-flow-register.component';
import { PaymentCollectionsComponent } from './payment-collections/payment-collections.component';
import { InstantDeliveredOrdersComponent } from './instant-delivered-orders/instant-delivered-orders.component';
import { InstantDeliveryProcessComponent } from './instant-delivery-process/instant-delivery-process.component';

const routes: Routes = [
  { path:'refill-booking-list',
   component:RefillBookingListComponent},
   { path:'refill-booking',
   component:RefillBookingComponent},
   { path:'cash-memo-and-refill-delivery',
   component:CashMemoAndRefillDeliveryComponent},
   { path:'deliver-refill',
   component:DeliverRefillComponent},
   { path:'instant-delivered-orders',
   component:InstantDeliveredOrdersComponent},
   { path:'instant-delivery-process',
   component:InstantDeliveryProcessComponent},
   { path:'undeliver-refill',
   component:UndeliverRefillComponent},
   { path:'delivered-orders',
   component:DeliveredOrdersComponent},
   { path:'undelivered-orders',
   component:UndeliveredOrdersComponent},
   { path:'delivery-man-wise-refill-order-summary',
   component:DeliveryManWiseRefillOrderSummaryComponent},
   { path:'area-wise-refill-order-summary',
   component:AreaWiseRefillOrderSummaryComponent},
   { path:'customer-wise-transactions',
   component:CustomerWiseTransactionsComponent},
   { path:'cash-flow-register',
   component:CashFlowRegisterComponent},
   { path:'payment-collections',
   component:PaymentCollectionsComponent},
]; 

export const routing=[RouterModule.forChild(routes)];
export const compArray=[
  AreaWiseRefillOrderSummaryComponent,
  CashMemoAndRefillDeliveryComponent,
  CashFlowRegisterComponent,
  CustomerWiseTransactionsComponent,
  DeliveredOrdersComponent,
  DeliverRefillComponent,
  DeliveryManWiseRefillOrderSummaryComponent,
  InstantDeliveredOrdersComponent,
  InstantDeliveryProcessComponent,
  PaymentCollectionsComponent,
  RefillBookingListComponent,
  RefillBookingComponent,
  UndeliveredOrdersComponent,
  UndeliverRefillComponent,
]
