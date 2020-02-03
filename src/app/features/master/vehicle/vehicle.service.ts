import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../../app.component';
@Injectable()
export class VehicleService {
   constructor(private httpClient: HttpClient) { }
   public postVehicle(data: any) {
      return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageVehicle`, { data: data }, AppComponent.httpOptions);
   }

}