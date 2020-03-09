import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class StockService {
    constructor(private httpClient: HttpClient) { }
    public calculateQtyGTotal(stock, ProductArray) {
        stock.ProdAmt = stock.QtyTotal = stock.SubTotal = stock.IgstTotal = stock.CgstTotal = stock.SgstTotal = stock.TtlRefundAmt = 0;
        if (ProductArray.length != 0)
            for (let i = 0; i < ProductArray.length; i++) {
                stock.ProdAmt = parseFloat(stock.ProdAmt) + parseFloat(ProductArray[i].ProdAmt);
                stock.TtlRefundAmt = parseFloat(stock.TtlRefundAmt) + parseFloat(ProductArray[i].RefundAmt == null ? 0 : ProductArray[i].RefundAmt);
                stock.QtyTotal = parseInt(stock.QtyTotal) + parseInt(ProductArray[i].ProdQty);
                stock.SubTotal = parseFloat(stock.SubTotal) + parseFloat(ProductArray[i].SubTotal);
                stock.IgstTotal = parseFloat(stock.IgstTotal) + parseFloat(ProductArray[i].IgstAmt);
                stock.CgstTotal = parseFloat(stock.CgstTotal) + parseFloat(ProductArray[i].CgstAmt);
                stock.SgstTotal = parseFloat(stock.SgstTotal) + parseFloat(ProductArray[i].SgstAmt);
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
    public getStockOrderDetails(cpcode, StartDate, EndDate, stage) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrder?StkOrdId=&OrderNo=&FOrderDt=${StartDate}&TOrderDt=${EndDate}&OrderType=&CPCode=${cpcode}&PlantId=&VehicleId=&OrderStatus=&OrderStage=${stage}&IsActive=Y`);
    }
    public getStockOrderProductDetails(cpcode, sktorderId, OrderNo, StartD, EndD) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtls?StkOrdId=${sktorderId}&OrderNo=${OrderNo}&FOrderDt=${StartD}&TOrderDt=${EndD}&OrderType=&CPCode=${cpcode}&PlantId=&VehicleId=&OrderStage=&IsActive=Y`);
    }
    public postImabalance(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ManageProdImbalance`, data);
    }
    public getStockImbalanceDetails(cpcode, StartDate, EndDate, stage) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetImbalanceDtls?ImbalanceId=&CPCode=${cpcode}&ProdSegId=&ProdId=&FDate=${StartDate}&TDate=${EndDate}&ReferenceNo=&Status=${stage}&IsActive=Y`);
    }
    public getLastDayEnd(cpcode) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetLastDayEndDate?pCPCode=${cpcode}`);
    }
    public getDayEndData(cpcode, data) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetCurrentStock?pCPCode=${cpcode}&pSegId=&pProdId=&pDayEndDate=${data.lastDayEnd}&pCurrentDate=${data.CurrentDate}&pType=`);
    }
    public postDayend(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}stock/ProcessDayEnd`, data);
    }
    public getDailyStockRegisterData(data) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetDailyStkRegister?pCPCode=${data.CPCode}&pSegId=${data.ProdSegId}&pProdId=${data.ProdSegId}&pFromDate=${data.StartDate}&pToDate=${data.EndDate}&pType=`);
    }



}
