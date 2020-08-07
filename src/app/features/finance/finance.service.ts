import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class FinanceService {
    constructor(private httpClient: HttpClient) { }

  public getChequeDDStatus(cpcode, cust) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetPaymentRegister?PayRegId=&ConsId=&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}&IsActive=&ConsNo=${cust.ConsNo}&MobileNo=${cust.MobileNo}&PayMode=CQ&PayStatus=PN`);
}
public getPayStatus(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=PAYS&IsActive=Y`);
}
public postCustPaymentStatus(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Finance/UpdateChequeStatus`, data, AppComponent.httpOptions);
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

    
}
