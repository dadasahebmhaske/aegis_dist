import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) { }

    // getProductDetails(cpcode, formFlag, ConsId) {
    //     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPD&CPCode=${cpcode}&FormFlag=${formFlag}&ConsId=${ConsId}&IsActive=Y`);
    // }
    // public getCustomer(cpcode, SubAreaId, ConsNo, MobNo) {
    //     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CUSTM&CPCode=${cpcode}&SubAreaId=${SubAreaId}&ConsNo=${ConsNo}&MobileNo=${MobNo}&IsActive=Y`);
    // }

    // public postCustomeTransfer(data: any) {
    //     return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ProcessTransCustomer`, data);
    // }

}
