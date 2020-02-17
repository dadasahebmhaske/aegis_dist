import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class TransportService {
  constructor(private httpClient:HttpClient) { }  
   public postTransport(data:string) {
      return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageVehicleType`,{data:data},AppComponent.httpOptions);      
    }
  }