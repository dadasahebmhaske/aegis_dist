import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class SubareaService {
  constructor(private httpClient:HttpClient) { }
  public postSubArea(data:string) {
     return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Master/IUDCPSubArea`,{data:data},AppComponent.httpOptions);      
   }
}
