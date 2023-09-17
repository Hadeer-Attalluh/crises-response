import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROLE } from '../_models/user-role.enum';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.currentUser?.role == USER_ROLE.ADMIN) {

      this.router.navigateByUrl('safety-check');
    }
    else if (this.authService.currentUser?.role == USER_ROLE.USER) {
      this.router.navigateByUrl('user-profile');

    }
  }

  ngOnInit(): void {
  }

}
