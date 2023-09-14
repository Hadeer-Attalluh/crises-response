import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-by-mobile',
  templateUrl: './verify-by-mobile.html',
  styleUrls: ['./verify-by-mobile.css']

})
export class VerifyByMobileComponent implements OnInit {
  verifyPhoneForm: FormGroup;
  otpForm: FormGroup;
  showOtp = false;
  msgError = '';
  constructor(
    private FBAuth: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }
  isValidPhoneNumber(phoneNumber) {
    const regex = /^\+2\d{11}$/;
    return regex.test(phoneNumber);
  }

  sendOtp() {
    let phoneNumber = this.verifyPhoneForm.get('phoneNumber')?.value;
    if (phoneNumber.match(/^\d+/)) {
      phoneNumber = "+2" + phoneNumber;
    }
    if (phoneNumber != null && this.verifyPhoneForm.valid) {
      this.FBAuth
        .authinticateUser(phoneNumber).then((res) => {
          this.showOtp = true;
        })
        .catch((error) => {
          this.msgError ='an error occurred please try again later';

        });
    }

  }

  verifyOtp() {
    const mobileCode = this.otpForm.get('otpCode')?.value;
    this.FBAuth.verifyOtp(mobileCode).then((res) => {
      if (res.user) {
        this.router.navigate(['/user-profile']);
      }
    }).catch((error) => {
      this.msgError ='an error occurred please try again later';


    })
  }

  private createForm() {
    this.verifyPhoneForm = new FormGroup({
      phoneNumber: new FormControl(
        "", [Validators.pattern(/^(\+2)?\d{11}$/), Validators.required])
    });
    this.otpForm = new FormGroup({
      otpCode: new FormControl(
        "", Validators.required)
    });
  }
}
