import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefillBookingListComponent } from './refill-booking-list/refill-booking-list.component';
import { RefillBookingComponent } from './refill-booking/refill-booking.component';
import { CashMemoAndRefillDeliveryComponent } from './cash-memo-and-refill-delivery/cash-memo-and-refill-delivery.component';
import { DeliverRefillComponent } from './deliver-refill/deliver-refill.component';
import { UndeliverRefillComponent } from './undeliver-refill/undeliver-refill.component';
const routes: Routes = [
  { path:'refill-booking-list',
   component:RefillBookingListComponent},
   { path:'refill-booking',
   component:RefillBookingComponent},
   { path:'cash-memo-and-refill-delivery',
   component:CashMemoAndRefillDeliveryComponent},
   { path:'deliver-refill',
   component:DeliverRefillComponent},
   { path:'undeliver-refill',
   component:UndeliverRefillComponent},

];

export const routing=[RouterModule.forChild(routes)];
export const compArray=[UndeliverRefillComponent,DeliverRefillComponent,CashMemoAndRefillDeliveryComponent,RefillBookingListComponent,RefillBookingComponent]
