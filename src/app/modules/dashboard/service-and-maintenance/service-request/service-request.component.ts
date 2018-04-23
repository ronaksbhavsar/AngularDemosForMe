import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { ServiceRequestService } from '../../../../services/service-request.service';
import { ServiceRequestModel } from '../../../../models/ServiceRequestModel';
import { Router } from '@angular/router';
import { Utilities } from '../../../../Utilities';
import { alert } from 'devextreme/ui/dialog';
import { confirm } from 'devextreme/ui/dialog';
import { CustomNotification } from '../../../../CustomNotification';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'dashboard-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit, OnDestroy {
  public serviceRequestDetails: ServiceRequestModel[] = [];
  public lotId: Number = 0;
  private subscriptions: Subscription[] = [];
  constructor(public subscriptionService: SubscriptionService,
    public customNotification: CustomNotification,
    public serviceRequestService: ServiceRequestService, public router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.lotId = lotId;
        this.subscriptions.push(this.serviceRequestService.getServiceRequestsByCommunityLotId(lotId).subscribe(x => {
          this.serviceRequestDetails = x ? x.ServiceRequests : [];
          this.bindOpenDate();
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public bindOpenDate() {
    if (this.serviceRequestDetails) {
      this.serviceRequestDetails.forEach(element => {
        element.OpenFormattedDate = Utilities.convertToStandardDateFormat(element.OpenDateString);
      });
    }
  }

  public onAddEditNewRequest(paramId) {
    this.serviceRequestService.resetServiceRequestWorkOrderDetails();
    this.serviceRequestService.resetAvailabilityData();
    this.router.navigate(['/ServicesMaintenance/ServiceRequest/' + paramId]);
  }

  onUpdateSignOffandMarkasDelete(ServiceRequestID: number, Status: number) {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.serviceRequestService.UpdateRequestStatusForSignOffandMarkasCompletefByRequestId(ServiceRequestID, Status, lotId).subscribe(x => {
          if (x && x.ServiceRequests.length > 0) {
            this.serviceRequestDetails = x.ServiceRequests;
            this.bindOpenDate();
            this.customNotification.notify(x.Message, "", Utilities.success);
          }
        }));
      }
    }));
  }

  onDeleteServiceRequest(ServiceRequestID: number) {
    Utilities.confirm("Are you sure want to delete?", "Remove Service Request")
      .then((x) => {
        if (x) {
          this.subscriptions.push(this.serviceRequestService.DeleteServiceRequestByServiceRequestID(ServiceRequestID, this.subscriptionService.CommunityLotId$.getValue()).subscribe(x => {
            if (x && x.ServiceRequests.length > 0) {
              this.serviceRequestDetails = x.ServiceRequests;
              this.bindOpenDate();
              this.customNotification.notify(x.Message, "", Utilities.success);
            }
            else {
              this.serviceRequestDetails = [];
            }
          }));
        }
      });

  }

}
