import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrisesResponseService {

  constructor() { }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.shareLocation(longitude, latitude);
      });
    } else {
      this.askAccessLocationPermisiion();
    }
  }

  shareLocation(longitude: number, latitude: number) {
    console.log(`${longitude}______${latitude}`);

    //Call API
  }

  askAccessLocationPermisiion() {
    // if android 
    // if ios
    // if browser
  }

  trackLocation() {
    navigator.geolocation.watchPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      console.log(`${longitude}______${latitude}`);

      // TODO: do sth if needed
    }, error => console.log('error watch location'), {
      enableHighAccuracy: true,

    }

    );
  }
}
