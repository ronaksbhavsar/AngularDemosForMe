import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { DashboardService } from '../../../../services/dashboard.service';
import { CommunityLotModel } from '../../../../models/CommunitylotModel';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { CommunityModel } from '../../../../models/CommunityModel';
import { Subscription } from 'rxjs/Subscription';
import { Utilities } from '../../../../Utilities';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DashboardService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  AuthUserObj: any = undefined;
  public communitName: string;
  public communityLots: CommunityLotModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public commonService: CommonService, public _router: Router,
    public dashboardService: DashboardService,
    public subscriptionService: SubscriptionService) {
    Utilities.renderGoogleTranslateScript();
    this.AuthUserObj = commonService.AuthUser.getValue();
  }

  public onLotValueChanged(data) {
    if (data.previousValue != 0 && data.value) {
      let str = this._router.url;
      //var result
      if ((str.match(new RegExp("/", "g")) || []).length > 1) {
        str = str.substring(1, str.length);
        str = "/" + str.substring(0, str.indexOf('/'));//.toLowerCase();
      }
      this.subscriptionService.setCommunityLotId(+data.value);
      this.communitName = this.communityLots.find(x => x.CommunityLotID == data.value).CommunityName;
      // this._router.navigate(['/profile']);
      this._router.navigate([str]);
      this.subscriptionService.IsDesignFeatureEnabled$.next(this.communityLots.find(x => x.CommunityLotID === data.value).IsDesignFeatureEnabled);
      // this._router.navigateByUrl('/ServiceRequest');
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.commonService.AuthUser.subscribe(buyerObj => {
      this.AuthUserObj = buyerObj;
    }));

    this.subscriptions.push(this.dashboardService.getCommunityLotByBuyerId().subscribe(x => {
      this.communityLots = x ? x.communitylot : [];
      if (this.communityLots.length > 0) {
        this.communitName = this.communityLots[0].CommunityName;
        this.subscriptionService.IsDesignFeatureEnabled$.next(this.communityLots[0].IsDesignFeatureEnabled);
      }
      this.communityLots.forEach(element => {
        element.LotNo = element.CommunityName + ' - ' + element.LotNo
      });
      this.subscriptionService.communityLots = this.communityLots.map(x => {
        return {
          CommunityLotId: x.CommunityLotID,
          CommunityID: x.CommunityID,
        }
      });

      if (this.communityLots.length > 0) {
        this.subscriptionService.setCommunityLotId(this.communityLots[0].CommunityLotID);
      }
    }));
  }

  logoutClick(event: any) {
    localStorage.removeItem(environment.token);
    this._router.navigate(['/login']);
  }

  onProfileClick(event: any) {
    this._router.navigate(['/profile']);
  }

}
