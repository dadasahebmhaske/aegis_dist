import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceAllocationListComponent } from './price-allocation-list/price-allocation-list.component';
import { PriceAllocationComponent } from './price-allocation/price-allocation.component';
const routes: Routes = [
  {path:'price-allocation-list',component:PriceAllocationListComponent},
  {path:'price-allocation',component:PriceAllocationComponent},
];


export const routing =[RouterModule.forChild(routes)];
export const compArray=[PriceAllocationComponent,PriceAllocationListComponent];
