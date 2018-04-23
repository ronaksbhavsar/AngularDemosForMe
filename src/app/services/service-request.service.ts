import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
import { ServiceRequestWorkorder, LocalStorageList, ServiceRequestPostModel, ServiceRequestAvailabilityModel } from '../models/ServiceRequestWorkOrderModel';
import { Utilities } from '../Utilities';
import { ServiceRequestModel } from '../models/ServiceRequestModel';
import { InsertMaintenanceViewModel } from '../models/MaintenanceModel';
import { TempAttachmentModel } from '../models/TempAttachementModel';
import { CommonService } from '../shared/services/common.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ServiceRequestService {

  constructor(public http: HttpClientService,
    private commonService: CommonService) {
    this.commonService.getServiceRequestFileConfig(environment.serviceRequestFileCount).subscribe(x =>
      this.commonService.serviceRequestFileCount.next(x && x.Value ? x.Value : 5)
    );
    this.commonService.getServiceRequestFileConfig(environment.serviceRequestFileSizePerFile).subscribe(x =>
      this.commonService.serviceRequestFileSizePerFile.next(x && x.Value ? x.Value : 4)
    );
    this.commonService.getServiceRequestFileConfig(environment.serviceRequestFileType).subscribe(x =>
      this.commonService.serviceRequestFileType.next(x && x.Value ? x.Value : "image/png,image/jpg")
    );
  }
  public getServiceRequestsByCommunityLotId(communityLotId: number) {
    return this.http.get('/ServiceRequest/GetServiceRequestsByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public getMaintenanceByCommunityLotId(communityLotId: number) {
    return this.http.get('/ServiceRequest/GetMaintenanceByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public getServiceRequestWorkOrderByServiceRequestID(serviceRequestId: number, communityLotId: number) {
    return this.http.get('/ServiceRequest/GetServiceRequestWorkOrderByServiceRequestID?ServiceRequestID=' + serviceRequestId + "&CommunityLotId=" + communityLotId);
  }

  public getMaterialsFromRoomID(roomID: number, CommunityLotID: number) {
    return this.http.get('/ServiceRequest/GetMaterialsFromRoomID?RoomID=' + roomID + "&CommunityLotID=" + CommunityLotID);
  }

  public getLocations() {
    return this.http.get('/ServiceRequest/GetLocations');
  }

  public getRooms(CommunityLotID: number) {
    return this.http.get('/ServiceRequest/GetRooms?CommunityLotID=' + CommunityLotID);
  }

  public SaveServiceRequest(allData: ServiceRequestPostModel) {
    return this.http.post('/ServiceRequest/SaveServiceRequest', allData);
  }

  public resetServiceRequestWorkOrderDetails() {
    localStorage.removeItem('workorder-list');
  }

  public getServiceRequestWorkorder(): LocalStorageList {
    return localStorage.getItem("workorder-list")
      ? JSON.parse(localStorage.getItem("workorder-list")) : new LocalStorageList();
  }

  public setServiceRequestWorkorder(details: LocalStorageList) {
    localStorage.removeItem('workorder-list');
    localStorage.setItem('workorder-list', JSON.stringify(details));
  }

  public addOrEditServiceRequestWorkOrderDetails(workOrder: ServiceRequestWorkorder) {
    let localData = this.getServiceRequestWorkorder()
    let list = localData.ServiceRequestWorkorderList;
    localStorage.removeItem('workorder-list');
    let isExist = list.some(x => x.UniqueWorkOrderID === workOrder.UniqueWorkOrderID);
    if (isExist) {
      let index = list.findIndex(x => x.UniqueWorkOrderID === workOrder.UniqueWorkOrderID);
      list.splice(index, 1);
    }
    list.push(workOrder);
    localStorage.setItem('workorder-list', JSON.stringify(localData));
  }

  public getServiceRequestWorkOrderAttachmentsByServiceRequestWorkOrderID(serviceRequestWorkorderID: number) {
    return this.http.get('/ServiceRequest/GetServiceRequestWorkOrderAttachmentsByServiceRequestWorkOrderID?ServiceRequestWorkorderID=' + serviceRequestWorkorderID);
  }

  public getServiceRequestAvailablityByServiceRequestID(serviceRequestID: number) {
    return this.http.get('/ServiceRequest/GetServiceRequestAvailablityByServiceRequestID?ServiceRequestID=' + serviceRequestID);
  }

  public setAvailabilityLocalData(serviceRequestAvailabilityData: ServiceRequestAvailabilityModel) {
    localStorage.setItem('serviceRequestAvailability', JSON.stringify(serviceRequestAvailabilityData));
  }

  public getAvailabilityLocalData(): ServiceRequestAvailabilityModel {
    return localStorage.getItem("serviceRequestAvailability")
      ? JSON.parse(localStorage.getItem("serviceRequestAvailability")) : undefined;
  }

  public resetAvailabilityData() {
    localStorage.setItem("serviceRequestAvailability", null);
  }


  public UpdateRequestStatusForSignOffandMarkasCompletefByRequestId(serviceRequestID: number, Status: number, CommunityLotID: number) {
    return this.http.post('/ServiceRequest/UpdateRequestStatusForSignOffandMarkasCompletefByRequestId',
      {
        ServiceRequestID: serviceRequestID,
        Status: Status,
        CommunityLotID: CommunityLotID
      });
  }

  public InsertCommunityLotMaintenanceTasks(insertMaintenanceViewModel: InsertMaintenanceViewModel) {
    return this.http.post('/ServiceRequest/InsertCommunityLotMaintenanceTasks', insertMaintenanceViewModel);
  }

  public DeleteServiceRequestByServiceRequestID(ServiceRequestID: number, CommunityLotID: number) {
    return this.http.post("/ServiceRequest/DeleteServiceRequestByServiceRequestID", { ServiceRequestID: ServiceRequestID, CommunityLotID: CommunityLotID });
  }

  public insertTempAttachment(tempAttachmentModel: TempAttachmentModel[]) {
    return this.http.post("/ServiceRequest/InsertTempAttachment", tempAttachmentModel);
  }

  public removeTempAttachment(tempAttachmentModel: TempAttachmentModel[]) {
    return this.http.post("/ServiceRequest/DeleteTempAttachment", tempAttachmentModel);
  }
}
