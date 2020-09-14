import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import * as CryptoJs from 'crypto-js';
import { MasterService } from '@app/core/custom-services/master.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {
  public loaderbtn:boolean=true;
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
  constructor(private router: Router,private authservice:AuthService,private appService:AppService,private masterService:MasterService) { }

  ngOnInit() {
  }
  forgotpass(event,form:NgForm){
    this.loaderbtn=false;
    event.preventDefault();
    if(!form.valid){
      return;
    }
    form.value.CPCode='';
    form.value.EmpId='';
    let ciphertext = this.appService.getEncrypted(form.value);
    this.authservice.forgotpass(ciphertext).subscribe(resData=>{
      this.loaderbtn=true;
    if(resData.StatusCode==1) {    
        
        AppComponent.SmartAlert.bigBox({
          title: `Your password has been sent to Registered E-mail ID`,
          // content: "Logged in successfully!",
          color: "#296191",
          icon: "fa fa-thumbs-up animated bounce ",
          number: "1",
          timeout: 6000
        });
        // this.router.navigate(['/dashboard']); 
        }
         else{
           AppComponent.SmartAlert.Errmsg(resData.Message);
         }
         },errorMessage=>{
        console.log(errorMessage);
     
      }
      );
  }
 
  // submit(event){
  //   event.preventDefault();
  //   this.router.navigate(['/dashboard/+analytics'])
  // }
}
