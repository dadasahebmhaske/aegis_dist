import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceAllocationListComponent } from './price-allocation-list/price-allocation-list.component';
import { PriceAllocationComponent } from './price-allocation/price-allocation.component';
import { CategoryWiseDiscountAllocationListComponent } from './category-wise-discount-allocation-list/category-wise-discount-allocation-list.component';
import { CategoryWiseDiscountAllocationComponent } from './category-wise-discount-allocation/category-wise-discount-allocation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SfSdPriceAllocationListComponent } from './sf-sd-price-allocation-list/sf-sd-price-allocation-list.component';
import { SfSdPriceAllocationComponent } from './sf-sd-price-allocation/sf-sd-price-allocation.component';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';

const routes: Routes = [
  {path:'category-wise-discount-allocation-list',component:CategoryWiseDiscountAllocationListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['STCDA']}},
  {path:'category-wise-discount-allocation',component:CategoryWiseDiscountAllocationComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['STCDA']}},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'price-allocation-list',component:PriceAllocationListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['STPRA']}},
  {path:'price-allocation',component:PriceAllocationComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['STPRA']}},
  {path:'sf-sd-price-allocation-list',component:SfSdPriceAllocationListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['STCDA']}},
  {path:'sf-sd-price-allocation',component:SfSdPriceAllocationComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['STCDA']}},
];


export const routing =[RouterModule.forChild(routes)];
export const compArray=[
  CategoryWiseDiscountAllocationComponent,
  CategoryWiseDiscountAllocationListComponent,
  ChangePasswordComponent,
  PriceAllocationComponent,
  PriceAllocationListComponent,
  SfSdPriceAllocationListComponent,
  SfSdPriceAllocationComponent];
