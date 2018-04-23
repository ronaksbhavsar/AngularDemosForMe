import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaintenanceModel, InsertMaintenanceViewModel } from '../../../../models/MaintenanceModel';
import { ServiceRequestService } from '../../../../services/service-request.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { CustomNotification } from '../../../../CustomNotification';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dashboard-maintenance-checklist',
  templateUrl: './maintenance-checklist.component.html',
  styleUrls: ['./maintenance-checklist.component.css']
})
export class MaintenanceChecklistComponent implements OnInit, OnDestroy {

  public maintenanceDetails: MaintenanceModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public serviceRequestService: ServiceRequestService,
    public subscriptionService: SubscriptionService,
    public customNotification: CustomNotification) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe((lotId) => {
      this.serviceRequestService.getMaintenanceByCommunityLotId(lotId).subscribe(x => {
        this.maintenanceDetails = x ? x.Maintenance : [];
      });
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
