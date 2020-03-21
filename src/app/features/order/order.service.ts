import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) { }

    public calculateQtyGTotalRefillB(cust, ProductArray) {
        cust.TtlProdQty = cust.Discount = cust.RefillAmount = cust.AmountPayable = 0;
        if (ProductArray.length != 0)
            for (let i = 0; i < ProductArray.length; i++) {
                cust.AmountPayable = parseInt(cust.AmountPayable) + parseInt(ProductArray[i].AmountPayable);
                cust.TtlProdQty = parseInt(cust.TtlProdQty) + parseInt(ProductArray[i].ProdQty);
                cust.Discount = parseInt(cust.Discount) + parseInt(ProductArray[i].Discount);
                cust.RefillAmount = parseInt(cust.RefillAmount) + parseInt(ProductArray[i].RefillAmount);
            }
        cust.TotalAmtPayable = cust.AmountPayable;
        return cust;
    }

    public calculateQtyGTotalRefillDelivery(deliverrefill, ProductArray) {
        deliverrefill.TotalAmount = deliverrefill.QtyTotal = deliverrefill.SubTotal = deliverrefill.IgstTotal = deliverrefill.CgstTotal = deliverrefill.SgstTotal = deliverrefill.ReturnQty = deliverrefill.TotalRefillAmt = deliverrefill.Discount = 0;
        if (ProductArray.length != 0)
            for (let i = 0; i < ProductArray.length; i++) {
                deliverrefill.TotalAmount = parseInt(deliverrefill.TotalAmount) + parseInt(ProductArray[i].TotalAmount);
                deliverrefill.Discount = parseInt(deliverrefill.Discount) + parseInt(ProductArray[i].Discount);
                deliverrefill.QtyTotal = parseInt(deliverrefill.QtyTotal) + parseInt(ProductArray[i].ProdQty);
                deliverrefill.SubTotal = parseInt(deliverrefill.SubTotal) + parseInt(ProductArray[i].SubTotal);
                deliverrefill.IgstTotal = parseInt(deliverrefill.IgstTotal) + parseInt(ProductArray[i].IgstAmt);
                deliverrefill.CgstTotal = parseInt(deliverrefill.CgstTotal) + parseInt(ProductArray[i].CgstAmt);
                deliverrefill.SgstTotal = parseInt(deliverrefill.SgstTotal) + parseInt(ProductArray[i].SgstAmt);
                deliverrefill.ReturnQty = parseInt(deliverrefill.ReturnQty) + (ProductArray[i].ReturnQty == undefined ? 0 : parseInt(ProductArray[i].ReturnQty));
                deliverrefill.TotalRefillAmt = parseInt(deliverrefill.TotalRefillAmt) + (parseInt(ProductArray[i].ProdRate) * parseInt(ProductArray[i].ProdQty));
            }
        return deliverrefill;
    }

    public postRefillBooking(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessRefillBooking`, data, AppComponent.httpOptions);
    }

    public getRefillBookingDetails(cpcode, StartDate, EndDate) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillBooking?BookRefNo=&CPCode=${cpcode}&ConsId=&BookStatus=2&Allocateduse=&CashMemoNo=&CashMemoRefNo=&CashMemoId=&IsActive=Y&FDate=${StartDate}&TDate=${EndDate}`, AppComponent.httpOptions);
    }
    public getCashMemoDetails(cpcode,RouteId, SubAreaId, ConsNo, MobileNo, StartDate, EndDate) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetCashMemo?CashMemoRefNo=&CPCode=${cpcode}&RouteId=${RouteId}&SubAreaId=${SubAreaId}&ConsNo=${ConsNo}&MobileNo=${MobileNo}&CashMemoStatus=2&Allocateduse=&CashMemoNo=&FDate=${StartDate}&TDate=${EndDate}`, AppComponent.httpOptions);
    }
    public getRefillBookingProducts(cpcode, BookRefNo) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillBookingProducts?BookRefNo=${BookRefNo}&CPCode=${cpcode}`, AppComponent.httpOptions);
    }
    public getCashMemoProducts(cpcode, CashMemoRefNo) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetCashMemoProducts?CashMemoRefNo=${CashMemoRefNo}&CPCode=${cpcode}`, AppComponent.httpOptions);
    }
    public getCPPriceAllocation(cpcode, ProdSegId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPProdPriceAllocation?PriceCode=&CPCode=${cpcode}&IsActive=Y&ProdSegId=${ProdSegId}&ProdId=&ProdType=F`, AppComponent.httpOptions);
    }
    public getReasonRemark() {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=RRR&IsActive=Y`);
    }
    public postCancelBooking(data: string) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessCancelRefillBooking`, { data: data }, AppComponent.httpOptions);
    }
    public postCashMemoDeliverRefill(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessRefillDelivery`, data, AppComponent.httpOptions);
    }
    public postCashMemoUndeliverRefill(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessMarkRefillUnDeliver`, data, AppComponent.httpOptions);
    }
    public getRefillDeliveryDetails(cpcode, delStatus, DelFilter, fd, td) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillDelivery?DelRefNo=&CPCode=${cpcode}&ConsId=&DelStatus=${delStatus}&DelUserCode=${DelFilter.DelUserCode}&ConsNo=${DelFilter.ConsNo}&MobileNo=${DelFilter.MobileNo}&FDate=${fd}&TDate=${td}`);
    }
    public getRefillDeliveryProductDetails(cpcode, delRef) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillDeliveryProducts?DelRefNo=${delRef}&CPCode=${cpcode}`);
    }
    public getPayMode() {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetpaymentMode?PayModeId=&PayMode=&IsActive=Y`);
    }
    public getCustVerify(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetCustomerAndPayRegister?ConsNo=${cust.ConsNo}&MobileNo=${cust.MobileNo}&CPCode=${cpcode}`);
    }

    public postCustPayment(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/InsertPaymentRegister`, data, AppComponent.httpOptions);
    }
    public getCashFlow(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetPaymentRegister?&ConsNo=${cust.ConsNo}&MobileNo=${cust.MobileNo}&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}`);
    }
    public getDelManWiseData(cpcode, data) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillDeliverySummaryDelManWise?DelRefNo=&pCPCode=${cpcode}&pDelUserCode=${data.DelUserCode}&pFDate=${data.StartDate}&pTDate=${data.EndDate}`);

    }
    public getAreaWiseOrderData(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillDeliverySummaryAreawise?pCPCode=${cpcode}&pRouteId=${cust.RouteId}&pSubAreaId=${cust.SubAreaId}&pFDate=${cust.StartDate}&pTDate=${cust.EndDate}`);
    }
    public getCustWisetransData(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillDeliveryProducts?&ConsNo=${cust.ConsNo}&MobileNo=${cust.MobileNo}&CPCode=${cpcode}&FDate=${cust.StartDate}&TDate=${cust.EndDate}`);
    }
}
