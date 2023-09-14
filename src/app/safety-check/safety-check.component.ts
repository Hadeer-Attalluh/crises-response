import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';
import * as xlsx from "xlsx";
import { Employee } from '../_models/employee.model';
import { CrisesResponseService } from '../_services/crises-response.service';
@Component({
  selector: 'app-safety-check',
  templateUrl: './safety-check.component.html',
  styleUrls: ['./safety-check.component.css']
})
export class SafetyCheckComponent implements OnInit {
  
  data: any[];
  constructor(private firebase: FirebaseService,private crisesReponseService:CrisesResponseService) { }

  ngOnInit(): void {
    this.crisesReponseService.getLatestCrisesCheckListEmployees().subscribe(
      ({employeeCheckList}) =>this.data=employeeCheckList
    );

    // this.firebase.requestNotificationPermission();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      const fileData = fileReader.result;
      const excelSheets = xlsx.read(fileData, { type: 'array' });
      const employeeSheetName = excelSheets.SheetNames[0];
      const employeeSheet = excelSheets.Sheets[employeeSheetName];
      const data = xlsx.utils.sheet_to_json(employeeSheet, { raw: true });

      this.data = data.map(employee => new Employee(employee));
      this.postDataToFirebase();

    };
  }

  requestPushNotification()
  {
    this.firebase.requestNotificationPermission();
    
  }
  postDataToFirebase() {
    console.log(this.data);

    this.firebase.addCrisesCheck(this.data)//.subscribe((success) => console.log(success)
  }

  // postUserToCrises()
  // {

  // }
}
