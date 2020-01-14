import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './master-routing.module';
import { UigridmasterDirective } from '../../core/directive/uigridmaster.directive';
import {RouteService} from './route/route.service';
import {SubareaService} from './sub-area/subarea.service';
import { TransportService } from './transport/transport.service';
import {VehicleService} from './vehicle/vehicle.service';
@NgModule({
  declarations: [componentArray,UigridmasterDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports:[UigridmasterDirective],
  providers:[RouteService,SubareaService,TransportService,VehicleService]
})
export class MasterModule { }
