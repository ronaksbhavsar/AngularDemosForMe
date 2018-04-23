import { Component, OnInit, OnDestroy } from '@angular/core';
import { SheduleService } from '../../../../services/shedule.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { SheduleModel } from '../../../../models/SheduleModel';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit, OnDestroy {
  SheduleModelList: SheduleModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(
    public subscriptionService: SubscriptionService,
    public sheduleService: SheduleService,
    public router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.sheduleService.GetMilestoneForBuyerByCommunityLotId(lotId).subscribe(x => {
          this.SheduleModelList = [];
          if (x && x.schedule) {
            x.schedule.forEach(element => {
              element.DueDate = Utilities.convertToStandardDateFormat(element.DueDate);
              element.CompleteDate = Utilities.convertToStandardDateFormat(element.CompleteDate);
            });
            this.SheduleModelList = x.schedule;
          }
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  ViewImage(id: number) {
    this.router.navigate(['/homepictures', id]);
  }
}
