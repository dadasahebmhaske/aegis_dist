import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class GodownService {
  constructor(private httpClient:HttpClient) { }
 public postGodown(data:any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}`,
     data);      
  }
}
