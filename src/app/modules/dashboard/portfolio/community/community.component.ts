import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioService } from '../../../../services/portfolio.service';
import { SubscriptionService } from '../../../../../app/shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {
  CommunityList: any[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public portfolioService: PortfolioService, public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.portfolioService.getCommunityDocumentByCommunityLotId(lotId).subscribe(x => {
          x.communitydocument.forEach(element => {
            element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
          });
          this.CommunityList = x.communitydocument;
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
