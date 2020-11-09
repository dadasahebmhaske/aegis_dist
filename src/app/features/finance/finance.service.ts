import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class FinanceService {
    constructor(private httpClient: HttpClient) { }

    public getChequeDDStatus(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetPaymentRegister?PayRegId=&ConsId=&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}&IsActive=&ConsNo=${cust.ConsNo}&MobileNo=${cust.MobileNo}&PayMode=CQ&PayStatus=PN`);
    }
    public getPayStatus() {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=PAYS&IsActive=Y`);
    }
    public postCustPaymentStatus(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Finance/UpdateChequeStatus`, data, AppComponent.httpOptions);
    }
    public getAccountForTransfer(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Finance/GetPaymentRegisterAccTrans?PayRegId=&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}&IsActive=&AccountType=CL`);
    }
    public postTransferToAccount(data, api) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Finance/${api}`, data, AppComponent.httpOptions);
    }
    public getPettyCashData(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Finance/GetPettyCashAccount?PettyCashId=&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}&CrDbFlag=&TransferFlag=&IsActive=&CreatedBy=`);
    }
    public getPettyCashDetails(PettyCashId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Finance/GetPettyCashAccountRefDtls?PettyCashId=${PettyCashId}&PayRegId=&ConsId=&CPCode=&FromDate=&ToDate=&ConsNo=&MobileNo=&IsActive=`);
    }
    public getBankAccountData(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Finance/GetBankAccount?BankId=&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}&CrDbFlag=&TransferFlag=&IsActive=&CreatedBy=`);
    } 
    public  getBankAccountDetails(BankId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Finance/GetBankAccountRefDtls?BankId=${BankId}&CPCode=&FromDate=&ToDate=&CrDbFlag=&TransferFlag=&IsActive=&CreatedBy=`);
    }
    public getExpensesType() {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetExpensesType?ExpTypeId=&CPCode=&MstFlag=&IsActive=Y`);
    }
    public getEmpoyee(cpcode) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=EMP&CPCode=${cpcode}&RoleCode=&IsActive=Y`);
      }
      public getExpensesDeatils(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Finance/GetUserExpenses?ExpId=&CPCode=${cpcode}&FromDate=${cust.StartDate}&ToDate=${cust.EndDate}&EmpId=&ExpTypeId=&IsActive=`);
      }
      public postExpenses(fd:any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Finance/InsertUserExpenses`, fd);
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
    public getPaymentDue(cpcode, cust) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Order/GetPaymentDueReport?ConsId=&CPCode=${cpcode}&Date=${cust.StartDate}&IsActive=Y&${cust.ConsNo}&MobileNo=${cust.MobileNo}`);
    }

}
