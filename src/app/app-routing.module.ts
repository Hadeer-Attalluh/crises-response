import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SafetyCheckComponent } from './safety-check/safety-check.component';
import { VerifyByMobileComponent } from './verify-by-mobile/verify-by-mobile';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  {
    path: 'verifyByMobile',
    component: VerifyByMobileComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'otp',
    component: OtpComponent,
    // canActivate: [AuthGuard]
  },
  // basic routes
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'safety-check',
        component: SafetyCheckComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-profile',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
