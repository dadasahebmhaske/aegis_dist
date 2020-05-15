import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './master-routing.module';
import { UigridmasterDirective } from '../../core/directive/uigridmaster.directive';
import {RouteService} from './route/route.service';
import {SubareaService} from './sub-area/subarea.service';
import { TransportService } from './transport/transport.service';
import {VehicleService} from './vehicle/vehicle.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { GodownService } from '@app/features/master/godown/godown.service';
import { EmployeeService } from '@app/features/master/employee/employee.service';
import { ChannelPartnerService } from '@app/features/master/channel-partner/channel-partner.service';

@NgModule({
  declarations: [componentArray,UigridmasterDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    
    BsDatepickerModule.forRoot(),
  ],
  exports:[UigridmasterDirective],
  providers:[ChannelPartnerService,GodownService,EmployeeService,RouteService,SubareaService,TransportService,VehicleService]
})
export class MasterModule { }
