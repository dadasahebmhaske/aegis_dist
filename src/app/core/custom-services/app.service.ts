import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { AppComponent } from './../../app.component';
import { ReplaySubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private AppData = new ReplaySubject<any>(1);
  datepipe = new DatePipe('en-US');
  constructor() {
    let appData = localStorage.getItem('appData');
    if (appData) {
      const decData = this.getDecryptedData();
      this.setProperty(decData, false);
    }
  }
  doEncryptionOf(data: any) {
    const encdata = CryptoJs.AES.encrypt(JSON.stringify(data), AppComponent.secureKey, { iv: AppComponent.secureKey }).ciphertext.toString(CryptoJs.enc.Base64);
    localStorage.appData = encdata;
    this.setProperty(this.getDecryptedData());
  }
  getDecryptedData() {
    var decrypted = CryptoJs.AES.decrypt(localStorage.appData, AppComponent.secureKey, { iv: AppComponent.secureKey });
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
  getEncrypted(Data: any) {
    let encrypted = CryptoJs.AES.encrypt(
      JSON.stringify(Data),
      AppComponent.secureKey, { iv: AppComponent.secureKey });
    return encrypted.ciphertext.toString(CryptoJs.enc.Base64);
  }
  removeBackdrop() {
    $(window).on('popstate', function (event) {
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    });
  }
  DateToString(date) {
    if (date != '' && date != null)
      return this.datepipe.transform(date, 'dd-MMM-yyyy');
    else
      return '';
  }
}
