import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, push, set } from 'firebase/database';
import { map, tap } from 'rxjs';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { Twilio } from 'twilio';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  readonly dbLink = 'https://crises-response-b46d0-default-rtdb.europe-west1.firebasedatabase.app/';

  readonly FCMKeyPair = 'BMdPrqiZz9W2WJ5faeLGEtBqDkGT6RjOooOZdMU_u5DKB9DR5k1FBeIgJ4nOvXsCGB4Ol9zfb0N6At5V3mvjlZ4';
  // TODO: Replace the following with your app's Firebase project configuration
  readonly firebaseConfig = {
    apiKey: "AIzaSyDM09nMorzgVrmPIZIvd6TZkqitcDdz4Bw",
    authDomain: "crises-response-b46d0.firebaseapp.com",
    projectId: "crises-response-b46d0",
    storageBucket: "crises-response-b46d0.appspot.com",
    messagingSenderId: "984067287775",
    appId: "1:984067287775:web:e71f1ef4c8293cdcbc576a",
    measurementId: "G-XQLM5WZJWK",
    vapidKey: this.FCMKeyPair
  };

  readonly firebaseApp: any;
  readonly fireAuth: any;
  readonly database: any;
  readonly messaging: any;

  // readonly twilio_account_sid = 'AC02149a568f4686ad42cf8fdc049c9abb';
  // readonly twilio_access_token = '8f35100dfa0d7114668f48afbe19e264';
  // readonly twilio_phone_no = '+12563336964';
  message: any = null;

  constructor(private http: HttpClient) {
    console.log('init firebase connections');

    this.firebaseApp = initializeApp(this.firebaseConfig);
    this.fireAuth = getAuth(this.firebaseApp);
    this.database = getDatabase();
    this.messaging = getMessaging(this.firebaseApp);

  }

  authinticateUser() {

  }

  // TODO: a usage ?
  requestNotificationPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: this.FCMKeyPair }).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            console.log(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }


  getCrises() {
    return this.http.get(this.dbLink + 'crises.json').pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  addCrisesCheck(checkList) {
    return this.http.post(this.dbLink + 'crises.json', { users: checkList }).pipe(
      tap(crisisId => {
        this.sendSmsToEmployees(checkList.map(user => user.mobile_number))
      })
    ).subscribe();
  }

  sendSmsToEmployees(numberList) {
    // TODO
    // const client = new Twilio(this.twilio_account_sid, this.twilio_access_token);
    // numberList?.forEach(mobile_number => {
    //   client.messages
    //     .create({
    //       from: this.twilio_phone_no,
    //       to: mobile_number,
    //       //  TODO: send link
    //       body: "Hope you're well during this crisis , follow the link and tell us if you need any help!",
    //     })
    //     .then((message) => console.log(message.sid));
    // });


  }
}
