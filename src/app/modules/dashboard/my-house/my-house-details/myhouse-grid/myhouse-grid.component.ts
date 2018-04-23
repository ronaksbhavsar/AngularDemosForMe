import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyHouseDetailsModel } from '../../../../../models/MyHouseModel';
import { SubscriptionService } from '../../../../../shared/services/subscription.service';
import { MyhouseService } from '../../../../../services/myhouse.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-myhouse-grid',
  templateUrl: './myhouse-grid.component.html',
  styleUrls: ['./myhouse-grid.component.css']
})
export class MyhouseGridComponent implements OnInit, OnDestroy {
  public myHouseDetailList: MyHouseDetailsModel[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public myhouseService: MyhouseService,
    public subscriptionService: SubscriptionService,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.myhouseService.selectedSectionId.subscribe(sectionId => {
      if (sectionId && this.subscriptionService.CommunityLotId$.getValue()) {
        this.subscriptions.push(this.myhouseService.GetMyHouseDetailsByCommunityLotID(this.subscriptionService.CommunityLotId$.getValue(), +(sectionId)).subscribe(data => {
          this.myHouseDetailList = (data && data.MyHouseDetailsList) ? data.MyHouseDetailsList : [];
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
