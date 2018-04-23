import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaintenanceModel, InsertMaintenanceViewModel } from '../../../../models/MaintenanceModel';
import { ServiceRequestService } from '../../../../services/service-request.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { CustomNotification } from '../../../../CustomNotification';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dashboard-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  public maintenanceDetails: MaintenanceModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public serviceRequestService: ServiceRequestService,
    public subscriptionService: SubscriptionService,
    public customNotification: CustomNotification) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe((lotId) => {
      this.subscriptions.push(this.serviceRequestService.getMaintenanceByCommunityLotId(lotId).subscribe(x => {
        this.maintenanceDetails = x ? x.Maintenance : [];
      }));
    }));
  }

  public onMarkAsCompletedButton(maintenanceScheduleTaskID: number) {
    let insertCommunityLotMaintenanceTasks = new InsertMaintenanceViewModel();
    insertCommunityLotMaintenanceTasks.CommunityLotID = this.subscriptionService.CommunityLotId$.getValue();
    insertCommunityLotMaintenanceTasks.MaintenanceScheduleTaskID = maintenanceScheduleTaskID;
    this.subscriptions.push(this.serviceRequestService.InsertCommunityLotMaintenanceTasks(insertCommunityLotMaintenanceTasks).subscribe((x) => {
      if (x && x.Maintenance) {
        this.maintenanceDetails = x.Maintenance;
        this.customNotification.notify(x.Message, "", Utilities.success);
      } else {
        this.customNotification.notify("Something went wrong. Please try again later.", "", Utilities.error);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
