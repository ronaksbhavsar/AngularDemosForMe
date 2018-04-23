import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { DashboardService } from '../../../services/dashboard.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { PersonModel } from '../../../models/PersonModel';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  @Input() isDashboard: boolean = false;
  public personDetails: PersonModel[] = [];
  public salesPersonDetail: PersonModel = new PersonModel();
  private subscriptions: Subscription[] = [];

  constructor(public dashboardService: DashboardService,
    public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        if (this.isDashboard) {
          this.dashboardService.getSalesPersonUserByCommunityLotId(lotId).subscribe(salesPerson => {
            this.salesPersonDetail = salesPerson && salesPerson.userprofile ? salesPerson.userprofile[0] : new PersonModel();
          });
        } else {
          this.dashboardService.getProjectUserByCommunityLotId(lotId).subscribe(projectUsers => {
            this.personDetails = (projectUsers) ? projectUsers.userprofile : [];
          });
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
