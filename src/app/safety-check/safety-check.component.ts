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
  data: any[] = [];
  tableData: any[];
  activeTab;
  constructor(private firebase: FirebaseService, private crisesReponseService: CrisesResponseService) {
    this.activeTab = 'noResponse';
  }

  get needHelpEmployees(): Employee[] {
    return this.data?.filter(employee => employee.is_safe === false) || [];
  }
  get markedSafeEmployees(): Employee[] {
    return this.data?.filter(employee => employee.is_safe === true) || [];
  }
  get noResponseEmployees(): Employee[] {
    return this.data?.filter(employee => employee.is_safe === null || employee.is_safe === undefined) || [];
  }
  ngOnInit(): void {
    this.getCrisisEmployeeCheckList();
    this.requestPushNotification();
    this.firebase.listenToNotifications(
      (payload) => {
        console.log('Message received. ', payload);
        console.log('Notification Type ', payload.data && payload.data['google.c.a.c_l']);
        const notificationType = payload.data && payload.data['google.c.a.c_l'];
        if (notificationType == 'response') {
          this.getCrisisEmployeeCheckList();
        }
      }
    );
  }

  onChangeTab(activeTab) {
    this.activeTab = activeTab;
    switch (activeTab) {
      case 'help':
        this.tableData = this.needHelpEmployees;
        break;
      case 'noResponse':
        this.tableData = this.noResponseEmployees;
        break;
      case 'safe':
        this.tableData = this.markedSafeEmployees;;
        break;
    }
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
      this.uploadNewCrisisCheck();

    };
  }

  sendSmsToEmployees() {
    const numberList = this.data.map(user => user.mobile_number);
    alert('send sms is coming soon!');
  }

  private uploadNewCrisisCheck() {
    console.log(this.data);
    this.firebase.addCrisesCheck(this.data)
      .subscribe(crisisId => {
        this.onChangeTab(this.activeTab);
      }
      );
  }

  private requestPushNotification() {
    this.firebase.requestNotificationPermission();
  }

  private getCrisisEmployeeCheckList() {
    this.crisesReponseService.getLatestCrisis().subscribe(
      (crisis) => {
        if (!crisis?.employeeCheckList) {
          console.log('no current crises');
          this.data = [];
        }
        else {
          this.data = crisis.employeeCheckList;
        }
        this.onChangeTab(this.activeTab);
      }
    );
  }
}
