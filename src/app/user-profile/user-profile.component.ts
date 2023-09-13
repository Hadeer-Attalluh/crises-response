import { Component, OnInit } from '@angular/core';
import { CrisesResponseService } from '../_services/crises-response.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private crisesService:CrisesResponseService) { }

  ngOnInit(): void {
    this.crisesService.getUserLocation();
  }

}
