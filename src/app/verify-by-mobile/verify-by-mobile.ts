import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-by-mobile',
  templateUrl: './verify-by-mobile.html',
})
export class VerifyByMobileComponent implements OnInit {
  phoneNumber = new FormControl();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private FBAuth: FirebaseService
    // private translate: TranslateService
  ) {
  }

  ngOnInit(): void {

  }
  sendOtp() {
    const phoneNumber = this.phoneNumber.value;
    this.FBAuth
      .authinticateUser(phoneNumber).then((res) => {
      })
      .catch((error) => {
      });
  }


}
