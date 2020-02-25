import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) { }

    public calculateQtyGTotalRefillB(cust, ProductArray) {
        cust.TotalAmt = cust.QtyTotal = cust.SubTotal = cust.IgstTotal = cust.CgstTotal = cust.SgstTotal = 0;
        if (ProductArray.length != 0)
            for (let i = 0; i < ProductArray.length; i++) {
                cust.TotalAmt = parseInt(cust.TotalAmt) + parseInt(ProductArray[i].TotalAmt);

                cust.QtyTotal = parseInt(cust.QtyTotal) + parseInt(ProductArray[i].ProdQty);
                cust.SubTotal = parseInt(cust.SubTotal) + parseInt(ProductArray[i].SubTotal);
                cust.IgstTotal = parseInt(cust.IgstTotal) + parseInt(ProductArray[i].IgstAmt);
                cust.CgstTotal = parseInt(cust.CgstTotal) + parseInt(ProductArray[i].CgstAmt);
                cust.SgstTotal = parseInt(cust.SgstTotal) + parseInt(ProductArray[i].SgstAmt);
            }
        return cust;
    }

    public calculateQtyGTotalRefillDelivery(deliverrefill, ProductArray) {
        deliverrefill.TotalAmount = deliverrefill.QtyTotal = deliverrefill.SubTotal = deliverrefill.IgstTotal = deliverrefill.CgstTotal = deliverrefill.SgstTotal = deliverrefill.ReturnQty = deliverrefill.TotalRefillAmt = 0;
        if (ProductArray.length != 0)
            for (let i = 0; i < ProductArray.length; i++) {
                deliverrefill.TotalAmount = parseInt(deliverrefill.TotalAmount) + parseInt(ProductArray[i].TotalAmount);
                // deliverrefill.ReturnRefillId = parseInt(deliverrefill.ReturnRefillId) + parseInt(ProductArray[i].ReturnRefillId);
                deliverrefill.QtyTotal = parseInt(deliverrefill.QtyTotal) + parseInt(ProductArray[i].ProdQty);
                deliverrefill.SubTotal = parseInt(deliverrefill.SubTotal) + parseInt(ProductArray[i].SubTotal);
                deliverrefill.IgstTotal = parseInt(deliverrefill.IgstTotal) + parseInt(ProductArray[i].IgstAmt);
                deliverrefill.CgstTotal = parseInt(deliverrefill.CgstTotal) + parseInt(ProductArray[i].CgstAmt);
                deliverrefill.SgstTotal = parseInt(deliverrefill.SgstTotal) + parseInt(ProductArray[i].SgstAmt);
                deliverrefill.ReturnQty = parseInt(deliverrefill.ReturnQty) + (ProductArray[i].ReturnQty == undefined ? 0 : parseInt(ProductArray[i].ReturnQty));
                deliverrefill.TotalRefillAmt = parseInt(deliverrefill.TotalRefillAmt) + (parseInt(ProductArray[i].ProdRate) * parseInt(ProductArray[i].ProdQty));
            }
        deliverrefill.TotalAmtPayable = deliverrefill.TotalAmount - deliverrefill.Discount;
        return deliverrefill;
    }

    public postRefillBooking(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessRefillBooking`, data, AppComponent.httpOptions);
    }

    public getRefillBookingDetails(cpcode, StartDate, EndDate) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetRefillBooking?BookRefNo=&CPCode=${cpcode}&ConsId=&BookStatus=2&Allocateduse=&CashMemoNo=&CashMemoRefNo=&CashMemoId=&IsActive=Y&FDate=${StartDate}&TDate =${EndDate}`, AppComponent.httpOptions);
    }
    public getRefillBookingProducts(cpcode, CashMemoRefNo) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetCashMemoProducts?CashMemoRefNo=${CashMemoRefNo}&CPCode=${cpcode}`, AppComponent.httpOptions);
    }
    public getCPPriceAllocation(cpcode, ProdSegId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPProdPriceAllocation?PriceCode=&CPCode=${cpcode}&IsActive=Y&ProdSegId=${ProdSegId}&ProdId=`, AppComponent.httpOptions);
    }

    public postCancelBooking(data: string) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessCancelRefillBooking`, { data: data }, AppComponent.httpOptions);
    }

    public postCashMemoDeliverRefill(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessRefillDelivery`, data, AppComponent.httpOptions);
    }


}
