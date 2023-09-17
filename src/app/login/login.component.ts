import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt, map } from 'rxjs';
import { USER_ROLE } from '../_models/user-role.enum';
import { AuthService } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';
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
    private FBAuth: FirebaseService
    // private translate: TranslateService
  ) {
    this.processingRequest = false;
    this.initLoginForm();
    if (this.authService.currentUser?.role == USER_ROLE.ADMIN) {

      this.router.navigateByUrl('/safety-check');
    }
    else if(this.authService.currentUser?.role == USER_ROLE.USER)
    {
      this.router.navigateByUrl('/user-profile');

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
    const password = this.loginForm.get('password')?.value;
    const email = this.loginForm.get('email')?.value;
    this.adminLogin().subscribe(
      (usersCredentials) => {
        const userEXist = usersCredentials.findIndex((userCredentials) => {
          return userCredentials.password == password && userCredentials.email == email
        });
        if (userEXist > -1) {
          const user = usersCredentials[userEXist];
          localStorage.setItem('currentUser', JSON.stringify({ token: user.email, role: USER_ROLE.ADMIN ,username:user.email}));
          this.router.navigate(['/safety-check'] );
        }
      }
    );
  }

  adminLogin() {
    return this.FBAuth.signInWithEmail()
      .pipe(map(admins => {
        const adminskeys = Object.keys(admins);
        return adminskeys.map(userKey => {
          return {
            password: admins[userKey].password,
            email: admins[userKey].email
          }
        })

      }
      ))
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
      email: new FormControl(
        '',
        [Validators.pattern(this.emailValidationRegex()), Validators.required]
      )
      ,
      password: new FormControl(
        '',
        [this.passwordCharactersValidator, Validators.minLength(8), Validators.required]

      ),
    });
  }
  private emailValidationRegex() {
    // tslint:disable-next-line:max-line-length
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  private passwordCharactersValidator(
    control: FormControl
  ) {
    const value = control.value as string;
    if (!value.match('[a-z]')) {
      return { passwordcharacters: true };
    }
    if (!value.match('[A-Z]')) {
      return { passwordcharacters: true };
    }
    if (!value.match('[0-9]')) {
      return { passwordcharacters: true };
    }
    if (!value.match('[#?!@$%^&*-]')) {
      return { passwordcharacters: true };
    }
    return null;
  }
}
