import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  // TODO: Replace the following with your app's Firebase project configuration
  readonly firebaseConfig = {
    //...
  };

  readonly firebaseApp: any;
  readonly fireAuth: any;
  readonly fireStore: any;
  constructor() {
    this.firebaseApp = initializeApp(this.firebaseConfig);
    this.fireAuth = getAuth(this.firebaseApp);
    this.fireStore = getFirestore(this.firebaseApp);
  }

  authinticateUser() {

  }


}
