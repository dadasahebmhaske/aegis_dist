import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class StockService {
    constructor(private httpClient: HttpClient) { }
    getPlantDetails(cpcode) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPP&CPCode=${cpcode}&IsActive=Y`);
    }

    // getProductDetails(cpcode, formFlag, ConsId) {
    //     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPD&CPCode=${cpcode}&FormFlag=${formFlag}&ConsId=${ConsId}&IsActive=Y`);
    // }
    public getOrderType() {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=ORDT&IsActive=Y`);
    }
    public postBulkOrders(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ProcessOrder`, data);
    }
    public getStockOrderDetails(cpcode, StartDate, EndDate) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrder?StkOrdId=&OrderNo=&FOrderDt=${StartDate}&TOrderDt=${EndDate}&OrderType=&CPCode=${cpcode}&PlantId=&VehicleId=&OrderStatus=&OrderStage=&IsActive=Y`);
    }
    public getStockOrderProductDetails(cpcode, sktorderId, OrderNo, StartD, EndD) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtls?StkOrdId=${sktorderId}&OrderNo=${OrderNo}&FOrderDt=${StartD}&TOrderDt=${EndD}&OrderType=&CPCode=${cpcode}&PlantId=&VehicleId=&OrderStage=PE&IsActive=Y`);
    }
    public postImabalance(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ManageProdImbalance`, data);
    }
    public getStockImbalanceDetails(cpcode, StartDate, EndDate) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetImbalanceDtls?ImbalanceId=&ProdSegId=&ProductCode=&FDate=&TDate=&ReferenceNo=&Status=&IsActive=Y`);
    }




}
