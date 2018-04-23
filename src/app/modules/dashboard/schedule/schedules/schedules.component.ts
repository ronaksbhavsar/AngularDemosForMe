import { Component, OnInit, OnDestroy } from '@angular/core';
import { SheduleService } from '../../../../services/shedule.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { SheduleModel } from '../../../../models/SheduleModel';
import { forEach } from '@angular/router/src/utils/collection';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit, OnDestroy {
  SheduleModelList: SheduleModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public subscriptionService: SubscriptionService, public sheduleService: SheduleService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.sheduleService.GetScheduleCommunityLotId(lotId).subscribe(x => {
          //x.ScheduleList=[];        
          if (x && x.ScheduleList) {
            x.ScheduleList.forEach(element => {
              element.DueDate = element.DueDate.includes("Past") ? element.DueDate
                : Utilities.convertToStandardDateFormat(element.DueDate);
              element.CompleteDate = Utilities.convertToStandardDateFormat(element.CompleteDate);
            });
            this.SheduleModelList = x.ScheduleList;
          } else {
            this.SheduleModelList = [];
          }
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
