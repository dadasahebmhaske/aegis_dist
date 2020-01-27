import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class RouteService {
  constructor(private httpClient:HttpClient) { }
 public postRoute(route:string) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Master/IUDCPRoute`,{data:route},AppComponent.httpOptions);      
  }
}
