
import {ModuleWithProviders} from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { RouteComponent } from './route/route.component';
const routes: Routes = [
  {
    path:'vehicle-master',
    component:VehicleMasterComponent
  },
  {
    path:'vehicle',
    component:VehicleComponent
  }, {
    path:'route-master',
    component:RouteMasterComponent
  },
  {
    path:'route',
    component:RouteComponent
  }

];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const routing=[RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray=[RouteComponent,RouteMasterComponent,VehicleComponent,VehicleMasterComponent];