import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';

import { SubscriptionService } from '../shared/services/subscription.service';
import { MyHouseModel } from '../models/MyHouseModel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class MyhouseService {
  public myhouseList = new BehaviorSubject<MyHouseModel[]>([]);
  public selectedSectionId = new BehaviorSubject<number>(null);

  constructor(public http: HttpClientService, public subscriptionService: SubscriptionService) {
    this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.GetHouseListByCommunityLotId(lotId).subscribe(home => {
          if (home && home.optionscategories) {
            this.myhouseList.next(home.optionscategories);
          }
        });
      }
    });
  }


  public GetHouseListByCommunityLotId(CommunityLotId: number) {
    return this.http.get("/MyHouse/GetHouseListByCommunityLotId?CommunityLotId=" + CommunityLotId);
  }

  public GetOptionsSubCategoriesByCommunityLotId(CommunityLotId: number, SectionId: number) {
    return this.http.get("/Sales/GetOptionsSubCategoriesByCommunityLotId?CommunityLotId=" + CommunityLotId + "&SectionId=" + SectionId);
  }

  public GetMyHouseDetailsByCommunityLotID(CommunityLotId: number, SectionId: number) {
    return this.http.get("/MyHouse/GetMyHouseDetailsByCommunityLotID?CommunityLotId=" + CommunityLotId + "&SectionId=" + SectionId);
  }

}
