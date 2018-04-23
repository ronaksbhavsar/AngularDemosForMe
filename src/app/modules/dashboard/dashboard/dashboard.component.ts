import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonService } from '../../../shared/services/common.service';
import { CommunityLotPicturesModel } from '../../../models/CommunityLotPicturesModel';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public welcomeMessage: string;
  public lotId: number = 0;
  public hasCommunityLotPicturesData: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(public router: Router, public authService: AuthService,
    public dashboardService: DashboardService,
    public subscriptionService: SubscriptionService,
    public titleService: Title
  ) {

  }

  ngOnInit() {
    this.subscriptions.push(this.dashboardService.getHomePageMessage().subscribe(x => {
      this.welcomeMessage = (x && x.Message) ? x.Message : "No message found";
    }));
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.lotId = lotId;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onLotPictures(data: boolean) {
    this.hasCommunityLotPicturesData = data;
  }
}
