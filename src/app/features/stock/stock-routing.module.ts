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

const routes: Routes = [ 
  { path:'add-imbalance',component:AddImbalanceComponent},
  { path:'daily-stock-register',component:DailyStockRegisterComponent},
  { path:'customer-daily-stock-register',component:CustomerDailyStockRegisterComponent},
  { path:'day-end',component:DayEndComponent},
  { path:'imbalance',component:ImbalanceComponent},
  { path:'stock-orders',component:StockOrdersComponent},
  { path:'stock-orders-list',component:StockOrdersListComponent},
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
  StockOrdersComponent,
  StockOrdersListComponent
];
