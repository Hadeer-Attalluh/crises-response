import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  appVerifier: any;
  confirmationResult: any;

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
    const phoneNumber = "+201272747752";
    if (!this.appVerifier) this.recaptcha();
    signInWithPhoneNumber(this.fireAuth, phoneNumber, this.appVerifier)
      .then((confirmationResult: any) => {
        this.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        return confirmationResult;
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }

  recaptcha() {
    this.appVerifier = new RecaptchaVerifier(this.fireAuth, 'sign-in-button', {
      size: 'invisible',
      callback: ((response: any) => {
        console.log('capresponse', response);
      }),
      'expired-callback': () => { },
      'error-callback': ((e: any) => {
        console.log("Error occurred", e);
      })
    });
  }

  async verifyOtp(otp: string, password?: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.appVerifier) {
          this.recaptcha();
        }
        const result = this.confirmationResult.confirm(otp).then((result: any) => {
          // User signed in successfully.
          const user = result.user;
          // ...
        });
      } catch (e) {
        // console.log("Verfy Err : ", e?.message);
        reject(e);
      }
    });
  }


}
