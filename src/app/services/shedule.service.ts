import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
@Injectable()
export class SheduleService {

  constructor(public http: HttpClientService) { }
  
  public GetMilestoneForBuyerByCommunityLotId(communityLotId: number) {
    return this.http.get('/Schedule/GetScheduleForBuyerByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public GetScheduleCommunityLotId(communityLotId: number) {
      return this.http.get('/Schedule/GetScheduleByCommunityLotId?CommunityLotId=' + communityLotId);
  }
}
