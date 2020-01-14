import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class TransportService {
  constructor(private httpClient:HttpClient) { }
  public postTransport(data:any) {
     return this.httpClient.post<any>(`${AppComponent.BaseUrl}`,
      data);      
   }
  }