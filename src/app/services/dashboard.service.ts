import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { MessageModel } from '../models/ApiResponseModel';
import { CommonService } from '../shared/services/common.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommunityLotModel } from '../models/CommunitylotModel';
import { PersonModel } from '../models/PersonModel';


@Injectable()
export class DashboardService {
  constructor(public http: HttpClientService) {
  }

  public getCommunityLotByBuyerId() {
    return this.http.get('/DashBoard/GetCommunityLotByBuyerId?');
  }

  public getHomePageMessage() {
    return this.http.get('/DashBoard/GetHomePageMessage');
  }

  public getSalesPersonUserByCommunityLotId(communityLotId: number) {
    return this.http.get('/DashBoard/GetSalesPersonUserByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public getProjectUserByCommunityLotId(communityLotId: number) {
    return this.http.get('/DashBoard/GetProjectUserByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public getCommunityDocumentByCommunityLotId(communityLotId: number) {
    return this.http.get('/DashBoard/GetCommunityDocumentByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public getCommunityLotPictureByCommunityLotId(communityLotId: number) {
    return this.http.get('/DashBoard/GetCommunityLotPictureByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public SaveProfile(Buyer: any) {
    return this.http.post('/DashBoard/SaveProfile', Buyer);
  }

  public GetAppintmentListByCommunityLotId(CommunityLotId: number) {
    return this.http.get("/DashBoard/GetAppintmentListByCommunityLotId?CommunityLotId=" + CommunityLotId);
  }
}
