import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../../../../services/messages.service';
import { MessageModel, InsertMessageCommentRequestModel, InsertMessageRequestModel } from '../../../../models/MessageModel';
import { DashboardService } from '../../../../services/dashboard.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'dashboard-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class DashboardMessageComponent implements OnInit, OnDestroy {
  public MessagesModelList: MessageModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public messageService: MessagesService, public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.messageService.GetMessagesByCommunityLotId(lotId).subscribe(x => {
          if (x) {
            x.message.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
            });
            this.MessagesModelList = x.message;
          } else {
            this.MessagesModelList = [];
          }
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
