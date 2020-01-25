import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import * as CryptoJs from 'crypto-js';
//import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public state: any = {
    tabs: {
      demo1: 0,
  
    },

    carousel: {
      demo1: {
        interval: 2000,
        noWrap: false,
        slides: [
          {
            title: 'Title 1',
            text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',
            src: 'assets/img/banner1.jpg',
          },
          {
            title: 'Title 2',
            text: 'Dolores justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',
            src: 'assets/img/banner1.jpg',
          }
        ]
      }
    }
  };
  constructor(private router: Router,private authservice:AuthService,private appService:AppService) { }

  ngOnInit() {
  }
  login(event,form:NgForm){
    event.preventDefault();
    if(!form.valid){
      return;
    }
    form.value.Appflag='DI'
    form.value.IsActive='Y';
   JSON.stringify(form.value);
    let encrypted=CryptoJs.AES.encrypt(
      JSON.stringify(form.value),
      AppComponent.secureKey,{iv:AppComponent.secureKey});
    let ciphertext=encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.authservice.logIn(ciphertext).subscribe(resData=>{
    if(resData.StatusCode==1) {
      this.appService.doEncryptionOf(resData.Data[0]);
         console.log(resData); 
         this.router.navigate(['/dashboard']) }
         else{
           AppComponent.SmartAlert.Errmsg(resData.Message);
         }
    //   if(resData.StatusCode==1)
    //   {AppComponent.router.navigate(['/dashboard/analytics']);
    //   //this.toastr.success( 'Login','Successfully!');            
    // } else{ alert(resData.Message +'Failure !');     }    
      },errorMessage=>{
        console.log(errorMessage);
        // this.error=errorMessage;      
        // this.isLoading=false;
      }
      );
  }

}
