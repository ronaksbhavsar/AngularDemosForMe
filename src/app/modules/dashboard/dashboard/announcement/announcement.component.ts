import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../../../../services/messages.service';
import { MessagesModel } from '../../../../models/ApiResponseModel';
import { AnnoucementModel } from '../../../../models/AnnoucementModel';
import { DashboardService } from '../../../../services/dashboard.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'dashboard-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class DashboardAnnouncementComponent implements OnInit, OnDestroy {
  public AnnoucementModelList: AnnoucementModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public messageService: MessagesService,
    public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.messageService.GetAnnoucementByCommunityLotId(lotId).subscribe(x => {
          if (x) {
            x.annoucement.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
            });
            this.AnnoucementModelList = x.annoucement;
          } else {
            this.AnnoucementModelList = [];
          }
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
