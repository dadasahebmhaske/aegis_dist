import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatashareService {
    private shareData = new BehaviorSubject<any>(null);
    GetSharedData = this.shareData.asObservable();
    constructor() {   }    
    updateShareData(data: any) {
        this.shareData.next(data)
    }
}