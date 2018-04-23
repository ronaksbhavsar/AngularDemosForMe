import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioService } from '../../../../services/portfolio.service';
import { SubscriptionService } from '../../../../../app/shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.css']
})
export class MyhomeComponent implements OnInit, OnDestroy {
  HomeList: any[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public portfolioService: PortfolioService,
    public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.portfolioService.getCommunityDocumentByCommunityLotId(lotId).subscribe(x => {
          x.paperlessfile.forEach(element => {
            element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
          });
          this.HomeList = x.paperlessfile.filter(x => x.IsMyHomeDoc == true);
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
