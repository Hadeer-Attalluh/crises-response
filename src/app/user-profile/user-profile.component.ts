import { Component, OnInit } from '@angular/core';
import { CrisesResponseService } from '../_services/crises-response.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { Employee } from '../_models/employee.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: Employee;
  readonly steps = {
    RESPONSE: 1,
    REQUEST_HELP: 2,
    RESPONSE_DONE: 3
  }
  currentStep;

  helpDescription: string = '';
  constructor(private crisesService: CrisesResponseService,
    private activatedRoute: ActivatedRoute) {
    this.currentStep = this.steps.RESPONSE;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(
      mergeMap((params) => {
        return this.crisesService.getuserInfo(params.get('mobile'))
      }))
      .subscribe(result => {
        this.user = result;
        console.log(this.user);

        this.crisesService.getUserLocation(this.user?.crisisId, this.user?.db_idx)
      });
  }

  needHelpReponse(response: boolean) {
    this.user.is_safe = !response;
    if (response === true) {
      this.currentStep = this.steps.REQUEST_HELP;
    }
    else {
      this.submitEmployeeCrisisResponse();
    }
  }

  submitEmployeeCrisisResponse() {
    this.user.support_requests = this.helpDescription;
    this.crisesService.submitEmployeeCrisisResponse(this.user).subscribe(result => {
      this.currentStep = this.steps.RESPONSE_DONE;
    })
  }

}
