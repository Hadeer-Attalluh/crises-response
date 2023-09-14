import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SafetyCheckComponent } from './safety-check/safety-check.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerifyByMobileComponent } from './verify-by-mobile/verify-by-mobile';

import { OtpComponent } from './otp/otp.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SafetyCheckComponent,
    UserProfileComponent,
    VerifyByMobileComponent,
    OtpComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
