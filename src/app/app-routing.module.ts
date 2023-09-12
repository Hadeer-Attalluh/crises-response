import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SafetyCheckComponent } from './safety-check/safety-check.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'safety-check',
    component: SafetyCheckComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
