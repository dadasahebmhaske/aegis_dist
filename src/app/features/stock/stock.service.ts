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
                if (ProductArray[i].OrderType == 'RO')
                    stock.QtyTotal = parseInt(stock.QtyTotal) + parseInt(ProductArray[i].ProdQty);
                stock.SubTotal = parseFloat(stock.SubTotal) + parseFloat(ProductArray[i].SubTotal);
                stock.IgstTotal = parseFloat(stock.IgstTotal) + parseFloat(ProductArray[i].IgstAmt);
                stock.CgstTotal = parseFloat(stock.CgstTotal) + parseFloat(ProductArray[i].CgstAmt);
                stock.SgstTotal = parseFloat(stock.SgstTotal) + parseFloat(ProductArray[i].SgstAmt);
            }
        stock.IgstTotal.toFixed(2);
        stock.CgstTotal.toFixed(2);
        stock.SgstTotal.toFixed(2);
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
    public postReturnRefund(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ProcessStockReturnRefund`, data);
    }
    public getSFSDStockOrderDetails(StartDate, EndDate, order) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrder?StkOrdId=&OrderNo=&FOrderDt=${StartDate}&TOrderDt=${EndDate}&OrderType=&CPCode=${order.CPCode}&PlantId=${order.PlantId}&VehicleId=&OrderStatus=&OrderStage=${order.OrderStage}&ParentCPCode=${order.ParentCPCode}&IsActive=Y`);
    }
    public getStockOrderDetails(cpcode, StartDate, EndDate, stage) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrder?StkOrdId=&OrderNo=&FOrderDt=${StartDate}&TOrderDt=${EndDate}&OrderType=&CPCode=${cpcode}&PlantId=&VehicleId=&OrderStatus=&OrderStage=${stage}&IsActive=Y`);
    }
    public getSFSDOrderDetails(StkOrdId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtls?StkOrdId=${StkOrdId}&OrderNo=&OrderType=&CPCode=&PlantId=&VehicleId=&OrderStage=PE&IsActive=Y&OrderCode=&Flag=AC`);
    }
    public getStockOrderProductDetails(cpcode, sktorderId, OrderNo, StartD, EndD) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtls?StkOrdId=${sktorderId}&OrderNo=${OrderNo}&FOrderDt=${StartD}&TOrderDt=${EndD}&OrderType=&CPCode=${cpcode}&PlantId=&VehicleId=&OrderStage=&IsActive=Y`);
    }
    public postImabalance(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ManageProdImbalance`, data);
    }
    public acceptSDSFOrder(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ProcessOrder`, data);
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
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetDailyStkRegister?pCPCode=${data.CPCode}&pSegId=${data.ProdSegId}&pProdId=${data.ProdId}&pFromDate=${data.StartDate}&pToDate=${data.EndDate}&pType=`);
    }
    public getCustomerDailyStockRegister(data) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetCustomerStock?pCPCode=${data.CPCode}&pSegId=&pProdId=&pMobileNo=${data.MobileNo}&pConsNo=${data.ConsNo}&pFromDate=${data.StartDate}&pToDate=${data.EndDate}`);
    }
    public getProductSegmentDetails(ChannelId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=PSM&StartDate=&EndDate&UserCode&IsActive=Y&PriCode&Name=&TwoFlag&ISHome=&ChannelId=${ChannelId}`);
    }
    public getSFSDOrderReportAcRjDi(data, action) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtls?StkOrdId=${data}&OrderNo=&OrderType=&CPCode=&PlantId=&VehicleId=&OrderStage=${action}&IsActive=Y&OrderCode=&Flag=${action}`);
    }
    public getSFSDAcceptedOrders(data) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtls?StkOrdId=${data}&OrderNo=&OrderType=&CPCode=&PlantId=&VehicleId=&OrderStage=PE&IsActive=Y&OrderCode=&Flag=DI`);
    }
    public postDispatchOrders(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrl}Stock/ProcessOrderDispatch`, data);
    }
    public getProductorderWiseOrderDetails(ParentCPCode, cpcode, StartDate, EndDate, empid) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetPrimarySalesDetails?ParentCPCode=${ParentCPCode}&CPCode=${cpcode}&SapId=&ChannelId=&RegionId=&StateCode=&CityCode=&FDate=${StartDate}&TDate=${EndDate}&ProdSegId=&ProdId=&PlantId=&RoleId=&EmpId=&UserCode=`);
    }
    public getSFSDProductorderWiseOrderDetails(ParentCPCode, cpcode, StartDate, EndDate, empid) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetSecondarySalesDetails?ParentCPCode=${ParentCPCode}&CPCode=${cpcode}&SapId=&ChannelId=&CPTypeId=&RegionId=&StateCode=&CityCode=&FDate=${StartDate}&TDate=${EndDate}&ProdSegId=&ProdId=&PlantId=&RoleId=&EmpId=&OrderType=&UserCode=`);
    }
    public getStockOrderDetailsForRefund(cpcode,ParentCPCode) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockOrderDtlsForReturnRefund?CPCode=${cpcode}&PlantId=&IsActive=Y&ParentCPCode=${ParentCPCode}&StkReturnRefundId=`);
    }
    public getReturnRefundlist(cpcode, StartDate, EndDate, stage) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockReturnRefundSum?CPCode=${cpcode}&PlantId=&IsActive=&ParentCPCode=&ReturnStatus=${stage}&FromDate=${StartDate}&ToDate=${EndDate}`);
    }
    public getReturnRefundProductDetails(cpcode, sktorderId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockReturnRefundDtls?CPCode=${cpcode}&PlantId=&IsActive=&ParentCPCode=&StkReturnRefundId=${sktorderId}`);
    }
    public getSFSDReturnRefundlist(cpcode, StartDate, EndDate, stage,ParentCPCode) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Stock/GetStockReturnRefundSum?CPCode=${cpcode}&PlantId=&IsActive=&ParentCPCode=${ParentCPCode}&ReturnStatus=${stage}&FromDate=${StartDate}&ToDate=${EndDate}`);
    }
}
