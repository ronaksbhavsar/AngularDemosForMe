import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../shared/services/common.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageModel, InsertMessageCommentRequestModel, InsertMessageRequestModel } from '../models/MessageModel';


@Injectable()
export class MessagesService {

  public MessageList:MessageModel[]=[];
  constructor(public http: HttpClientService, public commonService: CommonService) {
    //  this.MessageList=list;
   }

   public GetMessagesByCommunityLotId(CommunityLotId: number) {    
    return this.http.get('/DashBoard/GetMessagesByCommunityLotId?CommunityLotId=' + CommunityLotId);
  }

  public GetDepartmentList() {    
    return this.http.get('/DashBoard/GetDepartmentList');
  }

  public GetAnnoucementByCommunityLotId(CommunityLotId: number) {    
    return this.http.get('/DashBoard/GetAnnoucementByCommunityLotId?CommunityLotId=' + CommunityLotId);
  }

  public GetAnnoucementDetailsByAnnoucementId(CommunityLotId: number,AnnoucementId:number) { 
    return this.http.get('/Annoucement/GetAnnoucementDetailsByAnnoucementId?CommunityLotId=' + CommunityLotId +'&AnnoucementId='+AnnoucementId);
  }

  public GetMessageDetailsByMessageId(CommunityLotId: number,BuyerMessageId:number) { 
    return this.http.get('/Message/GetMessageDetailsByMessageId?CommunityLotId=' + CommunityLotId +'&BuyerMessageId='+BuyerMessageId);
  }
  
  public DeleteMessage(BuyerMessageId:number) { 
    
    return this.http.get('/Message/DeleteMessage?BuyerMessageId='+BuyerMessageId);
  }

 
  public InsertMessageReply(InsertMessageCommentRequest:InsertMessageCommentRequestModel) { 
    return this.http.post('/Message/InsertMessageReply',InsertMessageCommentRequest);
  }

  public InsertMessage(InsertMessageRequest:InsertMessageRequestModel) { 
    return this.http.post('/Message/InsertMessage',InsertMessageRequest);
  }

}

