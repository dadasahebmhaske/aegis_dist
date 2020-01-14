import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockOrdersComponent } from './stock-orders/stock-orders.component';
import { StockOrdersListComponent } from './stock-orders-list/stock-orders-list.component';
const routes: Routes = [ 
  { path:'stock-orders',component:StockOrdersComponent},
  { path:'stock-orders-list',component:StockOrdersListComponent},
];

export const routing = RouterModule.forChild(routes);
export const compArray=[
  StockOrdersComponent,
  StockOrdersListComponent
];
