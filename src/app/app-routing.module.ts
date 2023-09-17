import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SafetyCheckComponent } from './safety-check/safety-check.component';
import { VerifyByMobileComponent } from './verify-by-mobile/verify-by-mobile.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { USER_ROLE } from './_models/user-role.enum';

const routes: Routes = [
  {
    path: 'verifyByMobile',
    component: VerifyByMobileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // basic routes
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'safety-check',
        component: SafetyCheckComponent,
        canActivate: [AuthGuard],
        data: {
          role: USER_ROLE.ADMIN,
          redirectionPath: '/login'
        }
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
        data: {
          role: USER_ROLE.USER,
          redirectionPath: '/verifyByOtp'
        }
      }
    ],
  },
];

@NgModule({

  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
