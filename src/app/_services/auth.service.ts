import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: any;
  login(value: any) {
    return of(true);
  }
  currentUser: any;

  constructor() { }
}
