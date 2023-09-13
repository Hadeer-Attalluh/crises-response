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
    apiKey: "AIzaSyDM09nMorzgVrmPIZIvd6TZkqitcDdz4Bw",
    authDomain: "crises-response-b46d0.firebaseapp.com",
    projectId: "crises-response-b46d0",
    storageBucket: "crises-response-b46d0.appspot.com",
    messagingSenderId: "984067287775",
    appId: "1:984067287775:web:e71f1ef4c8293cdcbc576a",
    measurementId: "G-XQLM5WZJWK"
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
