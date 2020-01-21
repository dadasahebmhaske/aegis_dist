import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendGreetingsComponent } from './send-greetings/send-greetings.component';
import { ResendDacComponent } from './resend-dac/resend-dac.component';
import { CheckAndRechargeSmsComponent } from './check-and-recharge-sms/check-and-recharge-sms.component';
const routes: Routes = [
  {    path:'check-and-recharge-sms', component:CheckAndRechargeSmsComponent  },
  {    path:'resend-dac', component:ResendDacComponent  },
  {    path:'send-greetings', component:SendGreetingsComponent  },
  
];
export const routing=RouterModule.forChild(routes);
export const componentArray=[
  CheckAndRechargeSmsComponent,
  ResendDacComponent,
  SendGreetingsComponent
];
