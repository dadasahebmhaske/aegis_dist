
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
import { RouteMappingMasterComponent } from './route-mapping-master/route-mapping-master.component';
import { RouteMappingComponent } from './route-mapping/route-mapping.component';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
const routes: Routes = [
  { path: 'channel-partner-master', component: ChannelPartnerMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MCHPM']}},
  { path: 'channel-partner', component: ChannelPartnerComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MCHPM']}},
  { path: 'vehicle-master', component: VehicleMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MVCLE']}},
  { path: 'vehicle', component: VehicleComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MVCLE']} },
  { path: 'route-master', component: RouteMasterComponent },
  { path: 'route', component: RouteComponent },
  { path: 'route-mapping-master', component: RouteMappingMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MRMM']}},
  { path: 'route-mapping', component: RouteMappingComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MRMM']}},
  { path: 'godown-master', component: GodownMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MGODN']}},
  { path: 'godown', component: GodownComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MGODN']}},
  { path: 'transport-master', component: TransportMasterComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'sub-area-master', component: SubAreaMasterComponent },
  { path: 'sub-area', component: SubAreaComponent },
  { path: 'employee-master', component: EmployeeMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MEMPM']}},
  { path: 'employee', component: EmployeeComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MEMPM']}}
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
  EmployeeComponent, EmployeeMasterComponent, SubAreaComponent, SubAreaMasterComponent, TransportComponent, TransportMasterComponent, GodownComponent, GodownMasterComponent, RouteComponent, RouteMasterComponent,RouteMappingMasterComponent,RouteMappingComponent, VehicleComponent, VehicleMasterComponent];