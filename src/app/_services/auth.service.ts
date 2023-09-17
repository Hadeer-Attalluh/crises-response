import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(value: any) {
    return of(true);
  }
  
  constructor() { }

  get currentUser(): any{
    return JSON.parse(localStorage.getItem('currentUser')||'{}');
  }

  get isLoggedIn(): any
  {
    return this.currentUser?.username;
  }
}
