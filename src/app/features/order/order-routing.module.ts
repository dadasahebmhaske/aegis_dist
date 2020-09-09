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
import { InstantDeliveredOrdersComponent } from './instant-delivered-orders/instant-delivered-orders.component';
import { InstantDeliveryProcessComponent } from './instant-delivery-process/instant-delivery-process.component';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';

const routes: Routes = [

  { path:'refill-booking-list',component:RefillBookingListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TORDB']}},
   { path:'refill-booking', component:RefillBookingComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TORDB']}},
   { path:'cash-memo-and-refill-delivery',component:CashMemoAndRefillDeliveryComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TCMRD']}},
   { path:'deliver-refill',component:DeliverRefillComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TCMRD']}},
   { path:'instant-delivered-orders',component:InstantDeliveredOrdersComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TIDCH']}},
   { path:'instant-delivery-process',component:InstantDeliveryProcessComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TIDCH']}},
   { path:'undeliver-refill',component:UndeliverRefillComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TCMRD']}},
   { path:'delivered-orders',component:DeliveredOrdersComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TDORD']}},
   { path:'undelivered-orders',component:UndeliveredOrdersComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TDCOD']}},
   { path:'delivery-man-wise-refill-order-summary',component:DeliveryManWiseRefillOrderSummaryComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TDMOS']}},
   { path:'area-wise-refill-order-summary', component:AreaWiseRefillOrderSummaryComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TAROS']}},
   { path:'customer-wise-transactions',component:CustomerWiseTransactionsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['TCUWT']}},

]; 

export const routing=[RouterModule.forChild(routes)];
export const compArray=[
  AreaWiseRefillOrderSummaryComponent,
  CashMemoAndRefillDeliveryComponent,

  CustomerWiseTransactionsComponent,
  DeliveredOrdersComponent,
  DeliverRefillComponent,
  DeliveryManWiseRefillOrderSummaryComponent,
  InstantDeliveredOrdersComponent,
  InstantDeliveryProcessComponent,

  RefillBookingListComponent,
  RefillBookingComponent,
  UndeliveredOrdersComponent,
  UndeliverRefillComponent,
]
