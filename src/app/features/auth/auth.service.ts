import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import { AppModule } from 'src/app/app.module';
import { pipe,throwError, Subject, BehaviorSubject } from 'rxjs';
import{catchError,tap} from 'rxjs/operators';
import { AppComponent } from '../../../app/app.component';
import { User } from '../../core/models/user.model';
import { AppService } from '@app/core/custom-services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private distInfo:any;
  user =  new BehaviorSubject<User>(null);
  constructor(private appserive:AppService,private httpClient:HttpClient) { }
  logIn(loginData) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Authentication/GetEmpLogin`, {data: loginData}).pipe(catchError(errorRes=>{
          let errorMessage="An error Occured";
          if(!errorRes.error || errorRes.error.message){
            return throwError(errorMessage);
          }
          switch(errorRes.error.error.message){
            case "EMAIL_EXISTS":
            errorMessage="An email is already exists."
          }
          return throwError(errorMessage);
        }))
}
forgotpass(forgotData) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Authentication/GetEMPForgotPwd`, {data: forgotData}).pipe(catchError(errorRes=>{
        let errorMessage="An error Occured";
        if(!errorRes.error || errorRes.error.message){
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
          case "EMAIL_EXISTS":
          errorMessage="An email is already exists."
        }
        return throwError(errorMessage);
      }))
}
isLoggedIn(){  
  this.appserive.getAppData().subscribe(data=>{
    this.distInfo=data;
  });
  if(this.distInfo!=null){   
    return true;
  }else{
    return false;
  } 
}
isAccessIn(formFlag){  
  this.appserive.getAppData().subscribe(data=>{
    this.distInfo=data;
  });  
  
  if (this.distInfo.Menu.some(obj => obj === formFlag)) {
    return true;
  }else{
    return false;
  } 
}


}