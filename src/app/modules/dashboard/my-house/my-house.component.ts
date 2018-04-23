import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyhouseService } from '../../../services/myhouse.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { MyHouseModel } from '../../../models/MyHouseModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'dashboard-my-house',
  templateUrl: './my-house.component.html',
  styleUrls: ['./my-house.component.css']
})
export class MyHouseComponent implements OnInit, OnDestroy {

  public myhouseModelList: MyHouseModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public myHouseService: MyhouseService, public subscriptionService: SubscriptionService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.myHouseService.GetHouseListByCommunityLotId(lotId).subscribe(x => {
          this.myhouseModelList = (x && x.optionscategories) ? x.optionscategories : [];
        }));
      }
    }));
    this.subscriptions.push(this.subscriptionService.IsDesignFeatureEnabled$.subscribe(isDesignEnabled => {
      if (isDesignEnabled === true) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  onImageClick(temp: any) {
    this.router.navigate(['/myhouse/myhousedetails', temp.itemData.SectionId]);
    // this.router.navigate(['myhousedetails'], { queryParams: { sectionId: 5 } });
  }

}
