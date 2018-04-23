import { Injectable } from '@angular/core';

import { HttpClientService } from '../lib/http/http-client.service';
@Injectable()
export class AreainfoService {

  constructor(public http: HttpClientService) { }

  public getCommunityLotByBuyerId() {
    return this.http.get('/DashBoard/GetCommunityLotByBuyerId');
  }

}
