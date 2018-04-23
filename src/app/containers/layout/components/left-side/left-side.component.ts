import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css'],
})
export class LeftSideComponent implements OnInit, OnDestroy {
  public isDesignEnabled: boolean;
  public AuthUserObj: any = undefined;
  private subscriptions: Subscription[] = [];
  constructor(public subscriptionService: SubscriptionService,
    public commonService: CommonService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.IsDesignFeatureEnabled$.subscribe(isDesignEnabled => {
      this.isDesignEnabled = isDesignEnabled;
    }));
    this.subscriptions.push(this.commonService.AuthUser.subscribe(buyerObj => {
      this.AuthUserObj = buyerObj;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
