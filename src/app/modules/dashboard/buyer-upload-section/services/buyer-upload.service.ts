import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../lib/http/http-client.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { FileUploadModel } from '../Models/BuyerUploadModel';

@Injectable()
export class BuyerUploadService {
  constructor(private http: HttpClientService,
    private subscriptionService: SubscriptionService) { }

  public getBuyerUploadInterfaceListByBuyerId(communityLotId: number) {
    return this.http.get('/BuyerUploadInterface/GetBuyerUploadInterfaceListByBuyerId?CommunityLotId=' + communityLotId);
  }

  public getProject() {
    return this.http.get('/BuyerUploadInterface/GetProject');
  }

  public getCommunityProjectId(projectId: number) {
    return this.http.get('/BuyerUploadInterface/GetCommunityByProjectId?ProjectID=' + projectId);
  }

  public getConstructionMilestoneByCommunityLotId(communityLotId: number) {
    return this.http.get('/BuyerUploadInterface/GetConstructionMilestoneByCommunityLotId?CommunityLotId='
      + communityLotId);
  }

  public getBuyerUploadInterfaceListByCommunityLotId(communityLotId: number, taskId: number) {
    return this.http.get('/BuyerUploadInterface/GetBuyerUploadInterfaceListByCommunityLotId?CommunityLotId='
      + communityLotId + "&&TaskId=" + taskId);
  }

  public deleteCommunityLotPictureByCommunityLotId(uploadedFiles: FileUploadModel, communityLotId: number, taskId: number) {
    return this.http.get('/BuyerUploadInterface/DeleteCommunityLotPictureByCommunityLotId?CommunityLotId='
      + communityLotId + "&&TaskId=" + taskId +
      "&&CommunityLotPictureId=" + uploadedFiles.CommunityLotPictureId
      + "&&ImageName=" + uploadedFiles.ImageName);
  }

}
