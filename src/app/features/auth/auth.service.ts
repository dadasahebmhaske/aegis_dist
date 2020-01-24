import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import { AppModule } from 'src/app/app.module';
import { pipe,throwError, Subject, BehaviorSubject } from 'rxjs';
import{catchError,tap} from 'rxjs/operators';
import { AppComponent } from '../../../app/app.component';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user =  new BehaviorSubject<User>(null);
  constructor(private httpClient:HttpClient) { }
  logIn(loginData) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Distributor/GetDistlogin`, {params: loginData}).pipe(catchError(errorRes=>{
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


}