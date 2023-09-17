import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_ROLE } from '../_models/user-role.enum';
import { AuthService } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-by-mobile',
  templateUrl: './verify-by-mobile.component.html',
  styleUrls: ['./verify-by-mobile.component.css']

})
export class VerifyByMobileComponent implements OnInit {
  verifyPhoneForm: FormGroup;
  otpForm: FormGroup;
  showOtp = false;
  msgError = '';
  phoneNumber='';
  constructor(
    private FBAuth: FirebaseService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUser?.role == USER_ROLE.ADMIN) {

      this.router.navigateByUrl('safety-check');
    }
    else if(this.authService.currentUser?.role == USER_ROLE.USER)
    {
      this.router.navigateByUrl('user-profile');

    }
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
          console.log(res);
          this.showOtp = true;
        })
        .catch((error) => {
          this.msgError ='an error occurred please try again later';

        });
    }

  }

  verifyOtp() {
    const mobileCode = this.otpForm.get('otpCode')?.value;
    const mobileNumber= this.verifyPhoneForm.get('phoneNumber')?.value;
    this.FBAuth.verifyOtp(mobileCode).then((res) => {
      if (res.user) {
        localStorage.setItem('currentUser', JSON.stringify({ token: res.user.accessToken, role:USER_ROLE.USER ,username:mobileNumber}));
        this.router.navigate(['/user-profile'],{queryParams: {'mobile':encodeURI(mobileNumber)} });
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
