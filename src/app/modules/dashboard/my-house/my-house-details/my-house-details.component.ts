import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyhouseService } from '../../../../services/myhouse.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { MyHouseDetailsModel } from '../../../../models/MyHouseModel'
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-my-house-details',
  templateUrl: './my-house-details.component.html',
  styleUrls: ['./my-house-details.component.css']
})
export class MyHouseDetailsComponent implements OnInit, OnDestroy {

  public sectionId = 0;
  public sectionName: string;
  public myHouseDetailsModelList: MyHouseDetailsModel[] = [];
  @Input() myHomeList: any;
  private subscriptions: Subscription[] = [];

  constructor(public route: ActivatedRoute,
    public router: Router, public myHouseService: MyhouseService, public subscriptionService: SubscriptionService) {
    this.subscriptions.push(this.route.params.subscribe(res => {
      if (res) {
        this.sectionId = +res.sectionId
      }
    }));

  }

  ngOnInit() {
  }

  SetSection(text: any) {
    this.sectionName = text;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
