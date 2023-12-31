import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable, filter, map, of } from 'rxjs';
import { Crisis } from '../_models/crisis.model';
import { Employee } from '../_models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CrisesResponseService {

  constructor(private firebaseService: FirebaseService) { }

  getUserLocation(crisisId, userId) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.saveLocation(crisisId, userId, longitude, latitude);
      });
    } else {
      this.askAccessLocationPermisiion();
    }
  }

  saveLocation(crisisId, userId, longitude: number, latitude: number) {

    console.log(`${longitude}______${latitude}`);
    this.firebaseService.saveLocation(crisisId, userId, longitude, latitude);
    //Call API
  }

  askAccessLocationPermisiion() {
    // if android 
    // if ios
    // if browser
  }

  // trackLocation() {
  //   navigator.geolocation.watchPosition((position) => {
  //     const longitude = position.coords.longitude;
  //     const latitude = position.coords.latitude;
  //     console.log(`${longitude}______${latitude}`);

  //     // TODO: do sth if needed
  //   }, error => console.log('error watch location'), {
  //     enableHighAccuracy: true,

  //   }

  //   );
  // }

  submitEmployeeCrisisResponse(user) {
    return this.firebaseService.saveEmployeeCrisisResponse(user);
  }

  getLatestCrisis(): Observable<Crisis | null> {

    return this.firebaseService.getCrises()
      .pipe(map(crises => {
        const criseskeys = Object.keys(crises);
        if (criseskeys.length == 0) {
          return null;
        }
        return {
          id: criseskeys[criseskeys.length - 1],
          employeeCheckList: crises[criseskeys[criseskeys.length - 1]].users.map((employee, idx) => {
            const emp = new Employee(employee);
            emp.crisisId = criseskeys[criseskeys.length - 1];
            emp.db_idx = idx;
            return emp;
          })
        }
      }
      ));
  }

  getUserInfo(mobileNumber) {
    console.log(mobileNumber);

    return this.getLatestCrisis().pipe(map(
      crisis => {
        if (crisis == null) {
          console.log('no crises found');
          return new Employee({});
        }
        else if (!crisis.employeeCheckList?.find(employee => employee.mobile_number == mobileNumber)) {
          console.log('current user not checked in latest crisis');
          return new Employee({});
        }
        else
          return crisis.employeeCheckList.find(employee => employee.mobile_number == mobileNumber)||new Employee({});
      }
    ));
  }
}
