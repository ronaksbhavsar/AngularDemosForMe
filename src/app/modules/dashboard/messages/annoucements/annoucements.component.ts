import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../../services/messages.service';
import { MessagesModel } from '../../../../models/ApiResponseModel';
import { AnnoucementModel } from '../../../../models/AnnoucementModel';
import { DashboardService } from '../../../../services/dashboard.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-annoucements',
  templateUrl: './annoucements.component.html',
  styleUrls: ['./annoucements.component.css']
})
export class AnnoucementsComponent implements OnInit {

  public MessageList: AnnoucementModel[] = [];
  public AnnoucementModelList: AnnoucementModel[] = [];
  public AnnoucementModel: AnnoucementModel;
  popupVisible = false;
  private subscriptions: Subscription[] = [];

  constructor(public messageService: MessagesService,
    public subscriptionService: SubscriptionService,
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.messageService.GetAnnoucementByCommunityLotId(lotId).subscribe(x => {
          if (x) {
            x.annoucement.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
              this.AnnoucementModelList.push(element);
            });
            // this.AnnoucementModelList = x.annoucement;
          } else {
            this.AnnoucementModelList = [];
          }

        }));
      }
    }));


  }
  showInfo(annoucement) {

    this.AnnoucementModel = annoucement.data;
    this.AnnoucementModel.CreatedDate = Utilities.convertToStandardDateFormat(annoucement.data.CreatedDateString);
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.messageService.GetAnnoucementDetailsByAnnoucementId(lotId, this.AnnoucementModel.AnnoucementId).subscribe(x => {
          if (x) {
            this.popupVisible = true;
            // x.annoucement.CreatedDate=Utilities.convertToStandardDateFormat( x.annoucement.CreatedDate);
            x.annoucement.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
            });
            this.MessageList = x.annoucement;
          }
        });
      }
    }));

  }

  ClosePopup() {
    this.popupVisible = false;
  }

  onShown(event: any) {
    Utilities.setTitleDxPopup(event);
  }

}