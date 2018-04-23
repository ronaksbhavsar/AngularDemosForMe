import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../shared/services/common.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PortfolioService {

  constructor(public http: HttpClientService) { }

  public getCommunityDocumentByCommunityLotId(communityLotId: number) {
    return this.http.get('/DashBoard/GetCommunityDocumentByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public GetDataFileResponse(filePath: string) {
    return this.http.get('/DashBoard/GetDataFileResponse?filePath='+ filePath);
  }

  
}
