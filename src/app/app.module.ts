import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpgradeModule } from '@angular/upgrade/static';
import { UiGridDirective } from './core/directive/uigrid.directive';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,UiGridDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    UpgradeModule,
  
  ],
  providers: [],
  exports:[UiGridDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
