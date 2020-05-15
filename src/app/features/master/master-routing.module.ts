
import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { RouteComponent } from './route/route.component';
import { GodownMasterComponent } from './godown-master/godown-master.component';
import { GodownComponent } from './godown/godown.component';
import { TransportMasterComponent } from './transport-master/transport-master.component';
import { TransportComponent } from './transport/transport.component';
import { SubAreaMasterComponent } from './sub-area-master/sub-area-master.component';
import { SubAreaComponent } from './sub-area/sub-area.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChannelPartnerMasterComponent } from './channel-partner-master/channel-partner-master.component';
import { ChannelPartnerComponent } from './channel-partner/channel-partner.component';
const routes: Routes = [
  { path: 'channel-partner-master', component: ChannelPartnerMasterComponent },
  { path: 'channel-partner', component: ChannelPartnerComponent },
  { path: 'vehicle-master', component: VehicleMasterComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'route-master', component: RouteMasterComponent },
  { path: 'route', component: RouteComponent },
  { path: 'godown-master', component: GodownMasterComponent },
  { path: 'godown', component: GodownComponent },
  { path: 'transport-master', component: TransportMasterComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'sub-area-master', component: SubAreaMasterComponent },
  { path: 'sub-area', component: SubAreaComponent },
  { path: 'employee-master', component: EmployeeMasterComponent },
  { path: 'employee', component: EmployeeComponent }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  ChannelPartnerMasterComponent,
  ChannelPartnerComponent,
  EmployeeComponent, EmployeeMasterComponent, SubAreaComponent, SubAreaMasterComponent, TransportComponent, TransportMasterComponent, GodownComponent, GodownMasterComponent, RouteComponent, RouteMasterComponent, VehicleComponent, VehicleMasterComponent];