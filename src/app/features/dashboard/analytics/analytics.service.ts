import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class AnalyticsService {
  constructor(private httpClient:HttpClient) { }
  public getDashboradGrapghData(cpcode,status,date) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Dashboard/GetRefillTransSummaryForDashGraph?DistCode=${cpcode}&RptFlag=${status}&FromDate=${date}&ToDate=${date}`, AppComponent.httpOptions);
  } 
  public getTopThreeDeliveryBoy(cpcode,date) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Dashboard/GetRefillTransForTopDelMan?DistCode=${cpcode}&RptFlag=${status}&FromDate=${date}&ToDate=${date}`, AppComponent.httpOptions);
  }
  public getpieChartData(cpcode,date) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Dashboard/GetRefillTransForTopDelMan?DistCode=${cpcode}&RptFlag=${status}&FromDate=${date}&ToDate=${date}`, AppComponent.httpOptions);
  }
  public getRefillTransactionSummary(cpcode,date) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Dashboard/GetRefillTransForTopDelMan?DistCode=${cpcode}&RptFlag=${status}&FromDate=${date}&ToDate=${date}`, AppComponent.httpOptions);
  }
  public getDeliveryBoyWiseAnalysis(cpcode,date) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Dashboard/GetRefillTransForTopDelMan?DistCode=${cpcode}&RptFlag=${status}&FromDate=${date}&ToDate=${date}`, AppComponent.httpOptions);
  }
}