import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  classApplied = false;
  fieldTextType: boolean;
  loginForm: FormGroup;
  processingRequest: boolean;
  readonly errorMessageMapper = {
    username: {
      required: 'FORM_VALIDATION_ERRORS.REQUIRED_FEILD',
      noWhiteSpace: 'FORM_VALIDATION_ERRORS.REQUIRED_FEILD',
    },
    password: {
      required: 'FORM_VALIDATION_ERRORS.REQUIRED_FEILD',
    },
  };
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // private translate: TranslateService
  ) {
    this.processingRequest = false;
    this.initLoginForm();

    if (this.authService.currentUser) {
      this.router.navigateByUrl('dashboard');
    }
  }

  ngOnInit(): void {
    this.loginForm.get('username')?.valueChanges.subscribe((value) => {
      this.errorMessage = '';
    });
    this.loginForm.get('password')?.valueChanges.subscribe((value) => {
      this.errorMessage = '';
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.processingRequest = true;
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.processingRequest = false;
          this.router.navigateByUrl('/');
        }, 
        (error) => {
          this.processingRequest = false;
          this.handleLoginErrors((error).status);
        }
      );
    }
  }

  togglePassword(): void {
    this.classApplied = !this.classApplied;
    this.fieldTextType = !this.fieldTextType;
  }

  handleLoginErrors(errorCode: any) {
    console.log('error login');

  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(
        ''
      )
      ,
      password: new FormControl(
        '',
        [Validators.required]

      ),
    });
  }
}
