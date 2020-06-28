import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { BarChartComponent } from './barchart/barchart.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainDisplayComponent } from './main/main.component';
import { CountryDataComponent } from './countrydata/countrydata.component';
import { statedataComponent } from './statedata/statedata.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,

    LoginComponent,
    RegisterComponent,
    MainDisplayComponent,
    CountryDataComponent,
    statedataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}