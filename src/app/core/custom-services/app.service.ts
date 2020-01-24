import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { AppComponent } from './../../app.component';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private AppData = new ReplaySubject<any>(1);
  constructor() {
    let appData = localStorage.getItem('appData');
    if (appData){
        const decData=this.getDecryptedData();
        this.setProperty(decData, false);}
}
  doEncryptionOf(data: any) {   
      const encdata= CryptoJs.AES.encrypt(JSON.stringify(data), AppComponent.secureKey, {iv:AppComponent.secureKey}).ciphertext.toString(CryptoJs.enc.Base64);
        console.log(encdata);  
    localStorage.appData=encdata;   
    this.setProperty(this. getDecryptedData()) ;
  }
  getDecryptedData() {
      var decrypted = CryptoJs.AES.decrypt(localStorage.appData, AppComponent.secureKey, { iv: AppComponent.secureKey});
      return JSON.parse(decrypted.toString(CryptoJs.enc.Utf8));   
     
  }
  setProperty(property: any, storeProp: boolean = false) {
    if (storeProp)
    this.doEncryptionOf(property)
    this.AppData.next(property);
}
getAppData() {
    return this.AppData;
} 
}
