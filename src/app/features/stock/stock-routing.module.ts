import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockOrdersComponent } from './stock-orders/stock-orders.component';
import { StockOrdersListComponent } from './stock-orders-list/stock-orders-list.component';
import { ReturnStockListComponent } from './return-stock-list/return-stock-list.component';
import { ReturnStockComponent } from './return-stock/return-stock.component';
import { AddImbalanceComponent } from './add-imbalance/add-imbalance.component';
import { ImbalanceComponent } from './imbalance/imbalance.component';
import { DailyStockRegisterComponent } from './daily-stock-register/daily-stock-register.component';
import { DayEndComponent } from './day-end/day-end.component';
import { CustomerDailyStockRegisterComponent } from './customer-daily-stock-register/customer-daily-stock-register.component';
import { OrderAndDispatchDetailsComponent } from './order-and-dispatch-details/order-and-dispatch-details.component';
import { OrderAcceptedRejectedComponent } from './order-accepted-rejected/order-accepted-rejected.component';
import { OrderAcceptedRejectedDispatchedComponent } from './order-accepted-rejected-dispatched/order-accepted-rejected-dispatched.component';
import { OrderDispatchDetailsComponent } from './order-dispatch-details/order-dispatch-details.component';
import { ProductWiseOrderReportComponent } from './product-wise-order-report/product-wise-order-report.component';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
const routes: Routes = [ 
  { path:'add-imbalance',component:AddImbalanceComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SIMBL']}},
  { path:'daily-stock-register',component:DailyStockRegisterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SDSTR']}},
  { path:'customer-daily-stock-register',component:CustomerDailyStockRegisterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SCDSR']}},
  { path:'day-end',component:DayEndComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SDAYE']}},
  { path:'imbalance',component:ImbalanceComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SIMBL']}},
  { path:'order-and-dispatch-details',component:OrderAndDispatchDetailsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['SSODD']}},
  { path:'order-accepted-rejected',component:OrderAcceptedRejectedComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SSODD']}},
  { path:'order-dispatch-details',component:OrderDispatchDetailsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SSODD']}},
  { path:'order-accepted-rejected-dispatched',component:OrderAcceptedRejectedDispatchedComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SSODD']}},
  {path:'product-wise-order-report',component:ProductWiseOrderReportComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SPWOR']}},
  { path:'stock-orders',component:StockOrdersComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SSTKO']}},
  { path:'stock-orders-list',component:StockOrdersListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['SSTKO']}},
  { path:'return-stock',component:ReturnStockComponent},
  { path:'return-stock-list',component:ReturnStockListComponent},
];

export const routing = RouterModule.forChild(routes);
export const compArray=[
  AddImbalanceComponent,
  DailyStockRegisterComponent,
  CustomerDailyStockRegisterComponent,
  DayEndComponent,
  ImbalanceComponent,
  ReturnStockComponent,
  ReturnStockListComponent,
  OrderAndDispatchDetailsComponent,
  OrderAcceptedRejectedComponent,
  OrderDispatchDetailsComponent,
  OrderAcceptedRejectedDispatchedComponent,
  ProductWiseOrderReportComponent,
  StockOrdersComponent,
  StockOrdersListComponent
];
