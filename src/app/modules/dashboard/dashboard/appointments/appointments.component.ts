import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentModel } from '../../../../models/AppointmentModel';
import { DashboardService } from '../../../../services/dashboard.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'dashboard-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class DashboardAppointmentsComponent implements OnInit, OnDestroy {

  public appointmentModelList: AppointmentModel[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public dashboardService: DashboardService,
    public subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.dashboardService.GetAppintmentListByCommunityLotId(lotId).subscribe(res => {
          if (res && res.AppointmentList) {
            res.AppointmentList.forEach(element => {
              element.AppointmentDate = Utilities.convertToStandardDateFormat(element.AppointmentDate);
            });
            this.appointmentModelList = res.AppointmentList;
          }
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
