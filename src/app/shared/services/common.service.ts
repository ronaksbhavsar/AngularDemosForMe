import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PersonModel } from '../../models/PersonModel';
import { DashboardService } from '../../services/dashboard.service';
import { HttpClientService } from '../../lib/http/http-client.service';
import { CommunityLotModel } from '../../models/CommunitylotModel';
import { environment } from '../../../environments/environment';

@Injectable()
export class CommonService {
  public AuthUser = new BehaviorSubject(null);
  public Buyer = new BehaviorSubject(null);
  public serviceRequestFileCount = new BehaviorSubject(null);
  public serviceRequestFileType = new BehaviorSubject(null);
  public serviceRequestFileSizePerFile = new BehaviorSubject(null);
  constructor(public http: HttpClientService) {

  }

  setAuthUser(obj) {
    this.AuthUser.next(obj); //new Observable(observer => observer.next(obj));
  }
  public getCurrentBuyerDetails() {
    return this.http.get('/DashBoard/GetCurrentBuyerDetails');
  }

  public GetCityByStateId(StateId: number) {
    return this.http.get('/DashBoard/GetCityListByStateId?StateID=' + StateId);
  }

  public GetStateByCountryId(CountryId: number) {
    return this.http.get('/DashBoard/GetStateListByCountryId?CountryID=' + CountryId);
  }

  public getServiceRequestFileConfig(key: string) {
    return this.http.get('/ServiceRequest/GetServiceRequestFileConfig?KeyName=' + key);
  }
}
