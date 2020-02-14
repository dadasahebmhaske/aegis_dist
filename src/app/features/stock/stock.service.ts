import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class StockService {
    constructor(private httpClient: HttpClient) { }
    public calculateQtyGTotal(stock, ProductArray) {
        stock.GrandTotal = stock.QtyTotal = stock.SubTotal = stock.IgstTotal = stock.CgstTotal = stock.SgstTotal = 0;
        if (ProductArray.length != 0)
            for (let i = 0; i < ProductArray.length; i++) {
                stock.GrandTotal = parseInt(stock.GrandTotal) + parseInt(ProductArray[i].GrandTotal);
                stock.QtyTotal = parseInt(stock.QtyTotal) + parseInt(ProductArray[i].ProdQty);
                stock.SubTotal = parseInt(stock.SubTotal) + parseInt(ProductArray[i].SubTotal);
                stock.IgstTotal = parseInt(stock.IgstTotal) + parseInt(ProductArray[i].IgstAmt);
                stock.CgstTotal = parseInt(stock.CgstTotal) + parseInt(ProductArray[i].CgstAmt);
                stock.SgstTotal = parseInt(stock.SgstTotal) + parseInt(ProductArray[i].SgstAmt);
            }
        return stock;
    }
    getPlantDetails(cpcode) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPP&CPCode=${cpcode}&IsActive=Y`);
    }
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
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetImbalanceDtls?ImbalanceId=&CPCode=${cpcode}&ProdSegId=&ProdId=&FDate=${StartDate}&TDate=${EndDate}&ReferenceNo=&Status=&IsActive=Y`);
    }




}
