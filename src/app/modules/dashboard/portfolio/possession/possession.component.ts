import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioService } from '../../../../services/portfolio.service';

import { SubscriptionService } from '../../../../../app/shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-possession',
  templateUrl: './possession.component.html',
  styleUrls: ['./possession.component.css']
})
export class PossessionComponent implements OnInit, OnDestroy {
  PossessionList: any[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public portfolioService: PortfolioService, public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.portfolioService.getCommunityDocumentByCommunityLotId(lotId).subscribe(x => {
          x.paperlessfile.forEach(element => {
            element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
          });
          this.PossessionList = x.paperlessfile.filter(x => x.IsPrePossessionDoc == true);
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
