
import {ModuleWithProviders} from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { RouteComponent } from './route/route.component';
import { CustomerCategoryMasterComponent } from './customer-category-master/customer-category-master.component';
import { CustomerCategoryComponent } from './customer-category/customer-category.component';
import { GodownMasterComponent } from './godown-master/godown-master.component';
import { GodownComponent } from './godown/godown.component';
const routes: Routes = [
  {
    path:'vehicle-master',
    component:VehicleMasterComponent
  },
  {
    path:'vehicle',
    component:VehicleComponent
  }, 
  {
    path:'route-master',
    component:RouteMasterComponent
  },
  {
    path:'route',
    component:RouteComponent
  },
   {
    path:'customer-category-master',
    component:CustomerCategoryMasterComponent
  },
  {
    path:'customer-category',
    component:CustomerCategoryComponent
  }
  ,
  {
   path:'godown-master',
   component:GodownMasterComponent
 },
 {
   path:'godown',
   component:GodownComponent
 }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const routing=[RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray=[GodownComponent,GodownMasterComponent,CustomerCategoryComponent,CustomerCategoryMasterComponent,RouteComponent,RouteMasterComponent,VehicleComponent,VehicleMasterComponent];