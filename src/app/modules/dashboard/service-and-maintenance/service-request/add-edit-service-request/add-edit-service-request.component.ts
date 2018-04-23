import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../../../../../shared/services/subscription.service';
import { ServiceRequestService } from '../../../../../services/service-request.service';
import { ServiceRequestWorkorder, ServiceRequestWorkorderAttachment, LocalStorageList, ServiceRequestPostModel, ServiceRequestAvailabilityModel } from '../../../../../models/ServiceRequestWorkOrderModel';
import { LookUpModel } from '../../../../../models/LocationModel';
import { MaterialModel } from '../../../../../models/MaterialModel';
import { DxPopupComponent, DxFormComponent, DxDataGridComponent, DxValidationGroupComponent, DxValidatorComponent } from 'devextreme-angular';
import { Utilities } from '../../../../../Utilities';
import DataSource from 'devextreme/data/data_source';
import { ServiceRequestModel } from '../../../../../models/ServiceRequestModel';
import { CustomNotification } from '../../../../../CustomNotification';
import { ResponseTypeMessageModel } from '../../../../../models/ResponseTypeMessageModel';
import { TempAttachmentModel } from '../../../../../models/TempAttachementModel';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'dashboard-add-edit-service-request',
  templateUrl: './add-edit-service-request.component.html',
  styleUrls: ['./add-edit-service-request.component.css']
})
export class AddEditServiceRequestComponent implements OnInit {
  @ViewChild("workOrderDataGrid") workOrderDataGrid: DxDataGridComponent;
  @ViewChild("dxValidatorMonStart") dxValidatorMonStart: DxValidatorComponent;
  @ViewChild("dxValidatorTueStart") dxValidatorTueStart: DxValidatorComponent;
  @ViewChild("dxValidatorWedStart") dxValidatorWedStart: DxValidatorComponent;
  @ViewChild("dxValidatorThuStart") dxValidatorThuStart: DxValidatorComponent;
  @ViewChild("dxValidatorFriStart") dxValidatorFriStart: DxValidatorComponent;
  @ViewChild("dxValidatorSatStart") dxValidatorSatStart: DxValidatorComponent;
  @ViewChild("dxValidatorSunStart") dxValidatorSunStart: DxValidatorComponent;
  @ViewChild("dxValidatorMonEnd") dxValidatorMonEnd: DxValidatorComponent;
  @ViewChild("dxValidatorTueEnd") dxValidatorTueEnd: DxValidatorComponent;
  @ViewChild("dxValidatorWedEnd") dxValidatorWedEnd: DxValidatorComponent;
  @ViewChild("dxValidatorThuEnd") dxValidatorThuEnd: DxValidatorComponent;
  @ViewChild("dxValidatorFriEnd") dxValidatorFriEnd: DxValidatorComponent;
  @ViewChild("dxValidatorSatEnd") dxValidatorSatEnd: DxValidatorComponent;
  @ViewChild("dxValidatorSunEnd") dxValidatorSunEnd: DxValidatorComponent;
  public paramId: string;
  public serviceRequestWorkorderDetails: ServiceRequestWorkorder[] = [];
  public deletedServiceRequestWorkorderDetails: ServiceRequestWorkorder[] = [];
  public serviceRequestAvailability: ServiceRequestAvailabilityModel = new ServiceRequestAvailabilityModel();
  public serviceRequestTitle: string = "Create Service Request";
  private serviceRequestFileType: string;
  public blankTime: string = "00:00:00";
  private subscriptions: Subscription[] = [];

  constructor(public route: ActivatedRoute,
    public router: Router,
    public commonService: CommonService,
    public customNotification: CustomNotification,
    public subscriptionService: SubscriptionService,
    public serviceRequestService: ServiceRequestService) {
  }

  public onAddEditWorkOrder(uniqueWorkOrderID: string) {
    this.serviceRequestService.setAvailabilityLocalData(this.manageAvailabilityData());
    this.router.navigate(['/ServicesMaintenance/ServiceRequest/' + this.paramId + '/ServiceRequestWorkorder/' + uniqueWorkOrderID]);
  }

  ngOnInit() {
    let localData = this.serviceRequestService.getServiceRequestWorkorder();
    this.subscriptions.push(this.route.params.subscribe(param => this.paramId = param["serviceRequestId"].toLowerCase()));
    if (this.paramId !== "create") {
      this.serviceRequestTitle = "Edit Service Request";
      if (localData.ServiceRequestWorkorderList.length === 0
        && localData.DeletedServiceRequestWorkorder.length === 0) {
        this.loadFromAPI();
      } else {
        this.serviceRequestWorkorderDetails = localData.ServiceRequestWorkorderList;
      }
      if (!this.serviceRequestService.getAvailabilityLocalData()) {
        this.loadAvailabilityFromApi();
      } else {
        this.SetAvailabilityDataToControls(this.serviceRequestService.getAvailabilityLocalData());
      }
    } else {
      this.serviceRequestWorkorderDetails = localData.ServiceRequestWorkorderList;
      this.serviceRequestService.getAvailabilityLocalData() ? this.SetAvailabilityDataToControls(this.serviceRequestService.getAvailabilityLocalData()) : undefined;
    }

    this.subscriptions.push(this.commonService.serviceRequestFileType.subscribe(value => this.serviceRequestFileType = value));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onValidationCallbackMonStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.MonEnd);
  }

  public onValidationCallbackMonEnd = (options) => {
    this.dxValidatorMonStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.MonStart, options.value);
  }

  public onValidationCallbackTueStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.TueEnd);
  }

  public onValidationCallbackTueEnd = (options) => {
    this.dxValidatorTueStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.TueStart, options.value);
  }

  public onValidationCallbackWedStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.WedEnd);
  }

  public onValidationCallbackWedEnd = (options) => {
    this.dxValidatorWedStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.WedStart, options.value);
  }

  public onValidationCallbackThuStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.ThuEnd);
  }

  public onValidationCallbackThuEnd = (options) => {
    this.dxValidatorThuStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.ThuStart, options.value);
  }
  public onValidationCallbackFriStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.FriEnd);
  }

  public onValidationCallbackFriEnd = (options) => {
    this.dxValidatorFriStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.FriStart, options.value);
  }
  public onValidationCallbackSatStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.SatEnd);
  }

  public onValidationCallbackSatEnd = (options) => {
    this.dxValidatorSatStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.SatStart, options.value);
  }

  public onValidationCallbackSunStart = (options) => {
    return Utilities.momentDateConversion(options.value, this.serviceRequestAvailability.SunEnd);
  }

  public onValidationCallbackSunEnd = (options) => {
    this.dxValidatorSunStart.instance.validate();
    return Utilities.momentDateConversion(this.serviceRequestAvailability.SunStart, options.value);
  }
  public loadAvailabilityFromApi() {
    this.subscriptions.push(this.serviceRequestService.getServiceRequestAvailablityByServiceRequestID(+this.paramId).subscribe((data) => {
      this.SetAvailabilityDataToControls(data);
    }));
  }

  public SetAvailabilityDataToControls(data: ServiceRequestAvailabilityModel) {
    if (data) {
      this.serviceRequestAvailability.MonStart = Utilities.ConvertTimeToDate(data.MonStart ? data.MonStart.toString() : this.blankTime);
      this.serviceRequestAvailability.MonEnd = Utilities.ConvertTimeToDate(data.MonEnd ? data.MonEnd.toString() : this.blankTime);
      this.serviceRequestAvailability.TueStart = Utilities.ConvertTimeToDate(data.TueStart ? data.TueStart.toString() : this.blankTime);
      this.serviceRequestAvailability.TueEnd = Utilities.ConvertTimeToDate(data.TueEnd ? data.TueEnd.toString() : this.blankTime);
      this.serviceRequestAvailability.WedStart = Utilities.ConvertTimeToDate(data.WedStart ? data.WedStart.toString() : this.blankTime);
      this.serviceRequestAvailability.WedEnd = Utilities.ConvertTimeToDate(data.WedEnd ? data.WedEnd.toString() : this.blankTime);
      this.serviceRequestAvailability.ThuStart = Utilities.ConvertTimeToDate(data.ThuStart ? data.ThuStart.toString() : this.blankTime);
      this.serviceRequestAvailability.ThuEnd = Utilities.ConvertTimeToDate(data.ThuEnd ? data.ThuEnd.toString() : this.blankTime);
      this.serviceRequestAvailability.FriStart = Utilities.ConvertTimeToDate(data.FriStart ? data.FriStart.toString() : this.blankTime);
      this.serviceRequestAvailability.FriEnd = Utilities.ConvertTimeToDate(data.FriEnd ? data.FriEnd.toString() : this.blankTime);
      this.serviceRequestAvailability.SatStart = Utilities.ConvertTimeToDate(data.SatStart ? data.SatStart.toString() : this.blankTime);
      this.serviceRequestAvailability.SatEnd = Utilities.ConvertTimeToDate(data.SatEnd ? data.SatEnd.toString() : this.blankTime);
      this.serviceRequestAvailability.SunStart = Utilities.ConvertTimeToDate(data.SunStart ? data.SunStart.toString() : this.blankTime);
      this.serviceRequestAvailability.SunEnd = Utilities.ConvertTimeToDate(data.SunEnd ? data.SunEnd.toString() : this.blankTime);

      this.serviceRequestAvailability.OtherAvailability = data.OtherAvailability;
      this.serviceRequestAvailability.ServiceRequestAvailabilityID = data.ServiceRequestAvailabilityID;
      if (this.checkCurrentComparisionTime(data.MonStart, data.MonEnd)) {
        this.serviceRequestAvailability.IsMon = true;
      }
      if (this.checkCurrentComparisionTime(data.TueStart, data.TueEnd)) {
        this.serviceRequestAvailability.IsTue = true;
      }
      if (this.checkCurrentComparisionTime(data.WedStart, data.WedEnd)) {
        this.serviceRequestAvailability.IsWed = true;
      }
      if (this.checkCurrentComparisionTime(data.ThuStart, data.ThuEnd)) {
        this.serviceRequestAvailability.IsThu = true;
      }
      if (this.checkCurrentComparisionTime(data.FriStart, data.FriEnd)) {
        this.serviceRequestAvailability.IsFri = true;
      }
      if (this.checkCurrentComparisionTime(data.SatStart, data.SatEnd)) {
        this.serviceRequestAvailability.IsSat = true;
      }
      if (this.checkCurrentComparisionTime(data.SunStart, data.SunEnd)) {
        this.serviceRequestAvailability.IsSun = true;
      }
    }
  }

  private checkCurrentComparisionTime(start: string | Date, end: string | Date): boolean {
    let status: boolean = false;
    if (!Utilities.checkComparisionForTime(start) && Utilities.checkComparisionForTime(end) &&
      !Utilities.checkComparisionForTime(start) || Utilities.checkComparisionForTime(end)) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  public loadFromAPI() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(communitylotId => {
      this.subscriptions.push(this.serviceRequestService.getServiceRequestWorkOrderByServiceRequestID(+this.paramId, communitylotId).subscribe(data => {
        this.serviceRequestWorkorderDetails = data ? data.ServiceRequestWorkorders : [];
        this.serviceRequestWorkorderDetails.forEach((x) => {
          x.UniqueWorkOrderID = Utilities.generateGuid();
          x.ServiceRequestWorkorderAttachmentList.forEach(y => {
            y.IsImage = !(this.serviceRequestFileType.split(',')
              .find(x => x.includes(y.ImageName
                .split('.').pop())).toLowerCase().includes('video'));
            y.IsMarkForDelete = false;
            y.IsBase64 = false;
            y.IsStoredInDB = true;
            y.UniqueAttachmentID = Utilities.generateGuid();
          });
        })
        let localData = new LocalStorageList();
        localData.ServiceRequestWorkorderList = this.serviceRequestWorkorderDetails;
        this.serviceRequestService.setServiceRequestWorkorder(localData);
      }));
    }));
  }

  public onDeleteRow(event: any, data: ServiceRequestWorkorder) {
    Utilities.confirm("Aru you sure want to Delete?", "Issue").then((x) => {
      if (x) {
        let currentData = this.serviceRequestWorkorderDetails.find(x => x.UniqueWorkOrderID === data.UniqueWorkOrderID);
        if (currentData) {
          if (data.ServiceRequestWorkorderID) {
            this.deletedServiceRequestWorkorderDetails.push(currentData);
            let index = this.serviceRequestWorkorderDetails.findIndex(x => x.UniqueWorkOrderID === data.UniqueWorkOrderID);
            this.serviceRequestWorkorderDetails.splice(index, 1);
            let localData = new LocalStorageList();
            localData.ServiceRequestWorkorderList = this.serviceRequestWorkorderDetails;
            localData.DeletedServiceRequestWorkorder = this.deletedServiceRequestWorkorderDetails;
            this.serviceRequestService.setServiceRequestWorkorder(localData);
          } else {
            this.subscriptions.push(this.serviceRequestService.removeTempAttachment(this.getTempImages(currentData.ServiceRequestWorkorderAttachmentList)).subscribe(x => {
              let index = this.serviceRequestWorkorderDetails.findIndex(x => x.UniqueWorkOrderID === data.UniqueWorkOrderID);
              this.serviceRequestWorkorderDetails.splice(index, 1);
              let localData = new LocalStorageList();
              localData.ServiceRequestWorkorderList = this.serviceRequestWorkorderDetails;
              localData.DeletedServiceRequestWorkorder = this.deletedServiceRequestWorkorderDetails;
              this.serviceRequestService.setServiceRequestWorkorder(localData);
            }));
          }

        }
      }
    })
  }

  private getTempImages(serviceRequestWorkorderAttachment: ServiceRequestWorkorderAttachment[]): TempAttachmentModel[] {
    return serviceRequestWorkorderAttachment.map(y => {
      return {
        ImageDisplayName: y.UniqueAttachmentID + y.ImageDisplayName,
        FileAccessUrl: y.FileAccessUrl,
        IsStoredInDB: false,
        IsMarkForDelete: y.IsMarkForDelete
      };
    });
  }

  public onSaveServiceRequest() {
    if (this.serviceRequestWorkorderDetails.length === 0) {
      this.customNotification.notify("You need to add at least one Issue to save this Service Request", "", Utilities.warning);
      return;
    }
    this.subscriptions.push(this.serviceRequestService.SaveServiceRequest(this.processPostData()).subscribe((x: ResponseTypeMessageModel) => {
      this.serviceRequestService.resetServiceRequestWorkOrderDetails();
      this.router.navigate(['/ServicesMaintenance']);
      if (x) {
        this.customNotification.notify(x.Message, "", x.IsSuccess ? Utilities.success : Utilities.error);
      }
    }));
  }

  public processPostData() {
    let localData = this.serviceRequestService.getServiceRequestWorkorder();
    let workOrderList = localData.ServiceRequestWorkorderList;
    let deletedList = localData.DeletedServiceRequestWorkorder;
    let serviceRequest: ServiceRequestModel = new ServiceRequestModel();
    if (this.paramId !== "create") {
      for (let index = 0; index < deletedList.length; index++) {
        if (deletedList[index].ServiceRequestWorkorderID) {
          deletedList[index].IsMarkForDelete = true;
          workOrderList.push(deletedList[index]);
        }
      }
      serviceRequest.ServiceRequestID = +this.paramId;
    }
    serviceRequest.CommunityLotId = this.subscriptionService.CommunityLotId$.value;
    serviceRequest.CommunityID = this.subscriptionService.communityLots.find(x => x.CommunityLotId === this.subscriptionService.CommunityLotId$.getValue()).CommunityID;
    let serviceRequestData: ServiceRequestPostModel = new ServiceRequestPostModel();
    serviceRequestData.ServiceRequestWorkorder = workOrderList;
    serviceRequestData.ServiceRequestAvailability = this.manageAvailabilityData();
    serviceRequestData.ServiceRequest = serviceRequest;
    return serviceRequestData;
  }

  public manageAvailabilityData() {
    let finalAvailabilityModel = new ServiceRequestAvailabilityModel();
    let availabilityData = this.serviceRequestAvailability;
    if (availabilityData.IsMon) {
      finalAvailabilityModel.MonStart = Utilities.ConvertDateToTime(availabilityData.MonStart);
      finalAvailabilityModel.MonEnd = Utilities.ConvertDateToTime(availabilityData.MonEnd);
    }
    if (availabilityData.IsTue) {
      finalAvailabilityModel.TueStart = Utilities.ConvertDateToTime(availabilityData.TueStart);
      finalAvailabilityModel.TueEnd = Utilities.ConvertDateToTime(availabilityData.TueEnd);
    }
    if (availabilityData.IsWed) {
      finalAvailabilityModel.WedStart = Utilities.ConvertDateToTime(availabilityData.WedStart);
      finalAvailabilityModel.WedEnd = Utilities.ConvertDateToTime(availabilityData.WedEnd);
    }
    if (availabilityData.IsThu) {
      finalAvailabilityModel.ThuStart = Utilities.ConvertDateToTime(availabilityData.ThuStart);
      finalAvailabilityModel.ThuEnd = Utilities.ConvertDateToTime(availabilityData.ThuEnd);
    }
    if (availabilityData.IsFri) {
      finalAvailabilityModel.FriStart = Utilities.ConvertDateToTime(availabilityData.FriStart);
      finalAvailabilityModel.FriEnd = Utilities.ConvertDateToTime(availabilityData.FriEnd);
    }
    if (availabilityData.IsSat) {
      finalAvailabilityModel.SatStart = Utilities.ConvertDateToTime(availabilityData.SatStart);
      finalAvailabilityModel.SatEnd = Utilities.ConvertDateToTime(availabilityData.SatEnd);
    }
    if (availabilityData.IsSun) {
      finalAvailabilityModel.SunStart = Utilities.ConvertDateToTime(availabilityData.SunStart);
      finalAvailabilityModel.SunEnd = Utilities.ConvertDateToTime(availabilityData.SunEnd);
    }
    finalAvailabilityModel.OtherAvailability = availabilityData.OtherAvailability;
    finalAvailabilityModel.ServiceRequestAvailabilityID = availabilityData.ServiceRequestAvailabilityID;
    if (this.paramId.toLowerCase() !== "create") {
      finalAvailabilityModel.ServiceRequestID = +this.paramId;
    }
    return finalAvailabilityModel;
  }

  onBackButtonClick() {
    this.router.navigate(['/ServicesMaintenance/0/ServiceRequest']);
  }
}
