import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MessagesService } from '../../../../services/messages.service';
import { MessageModel, InsertMessageCommentRequestModel, InsertMessageRequestModel } from '../../../../models/MessageModel';
import { DashboardService } from '../../../../services/dashboard.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { debug } from 'util';
import { Utilities } from '../../../../Utilities';
import { CustomNotification } from '../../../../CustomNotification';
import { Subscription } from 'rxjs/Subscription';
import { DxDataGridComponent } from 'devextreme-angular';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit, OnDestroy {
  @ViewChild("messageGrid") messageGrid: DxDataGridComponent;
  @ViewChild("replyGrid") replyGrid: DxDataGridComponent;
  public MessagesModelList: MessageModel[] = [];
  public lotId: number = 0;
  public MessageList: any = [];
  public insertComment: InsertMessageCommentRequestModel = new InsertMessageCommentRequestModel();
  public Message: InsertMessageRequestModel = new InsertMessageRequestModel();
  replyAndViewTitle: string;
  popupVisible = false;
  messagePopupVisible = false;
  public isReply = false;
  submitted = false;

  public DepartmentList: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public messageService: MessagesService,
    public subscriptionService: SubscriptionService,
    public customNotification: CustomNotification) { }

  public LoadMessages() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.lotId = lotId;
        this.subscriptions.push(this.messageService.GetMessagesByCommunityLotId(lotId).subscribe(x => {
          if (x) {
            x.message.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
            });
            this.MessagesModelList = x.message;
          } else {
            this.MessagesModelList = this.DepartmentList = [];
          }
          this.messageGrid.instance.refresh();
        }));
      }
    }));
  }

  ngOnInit() {
    this.LoadMessages();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  showInfo(message, isreply) {
    this.isReply = isreply;
    this.replyAndViewTitle = "View Message";
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.messageService.GetMessageDetailsByMessageId(lotId, message.BuyerMessageId).subscribe(x => {
          if (x) {
            x.message[0].CreatedDate = Utilities.convertToStandardDateFormat(x.message[0].CreatedDateString);
            x.message[0].messagecomment.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
            });
            this.popupVisible = true;
            this.MessageList = x.message[0];
          }

        }));

      }
    }));
  }

  Reply(message, isreply) {
    this.isReply = isreply;
    this.replyAndViewTitle = "Reply Message";
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.messageService.GetMessageDetailsByMessageId(lotId, message.BuyerMessageId).subscribe(x => {
          if (x) {
            this.popupVisible = true;
            x.message[0].CreatedDate = Utilities.convertToStandardDateFormat(x.message[0].CreatedDateString);
            x.message[0].messagecomment.forEach(element => {
              element.CreatedDate = Utilities.convertToStandardDateFormat(element.CreatedDateString);
            });
            this.MessageList = x.message[0];
          }
        }));
      }
    }));
  }

  DeleteMessage(message) {
    Utilities.confirm("Are you sure want to delete?", "")
      .then((x) => {
        if (x) {
          this.subscriptions.push(this.messageService.DeleteMessage(message.BuyerMessageId).subscribe(x => {
            this.customNotification.notify('Message has been deleted successfully.', '', Utilities.success)
            this.LoadMessages();
          }));
        }
      });
  }

  ClosePopup() {
    this.submitted = false;
    this.popupVisible = false;
    this.messagePopupVisible = false;
    this.Message = new InsertMessageRequestModel();
    // this.LoadMessages();
  }

  SaveReply(myForm) {
    this.submitted = true;
    // if( this.insertComment.Comment.trim().length==0)
    //       this.insertComment.Comment="";
    if (myForm.valid) {
      this.popupVisible = false;
      this.insertComment.BuyerMessageId = this.MessageList.BuyerMessageId;
      this.insertComment.Comment = (this.MessageList.message as string).trim();
      this.insertComment.CommentFrom = 'B';
      this.subscriptions.push(this.messageService.InsertMessageReply(this.insertComment).subscribe(x => {
        if (x) {
          this.isReply = false;
          this.submitted = false;
          this.customNotification.notify("Message has been saved successfully", "", Utilities.success);
        }
      }));
    }

  }

  AddNewMessage() {
    this.messagePopupVisible = true;
    var temp = this.Message;
    this.Message = new InsertMessageRequestModel();
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotID => {
      if (lotID) {
        this.subscriptions.push(this.messageService.GetDepartmentList().subscribe(x => {
          if (x) {
            this.DepartmentList = x.DepartmentList;
            this.Message.DepartmentId = this.DepartmentList[0].ID;
          }
        }));
      }
    }));
  }

  public onShown(event: any) {
    if (this.replyGrid && this.replyGrid.instance) {
      this.replyGrid.instance.refresh();
    }
  }

  public onTitleRendered(event: any) {
    Utilities.setTitleDxPopup(event);
  }

  SaveMessage(ngform, event) {
    this.submitted = true;
    if (ngform.valid) {
      this.Message.CommunityLotID = this.subscriptionService.CommunityLotId$.getValue();
      this.Message.MessageForm = "B";
      this.Message.Subject = this.Message.Subject.trim();
      this.subscriptions.push(this.messageService.InsertMessage(this.Message).subscribe(x => {
        this.messagePopupVisible = false;
        this.submitted = false;
        this.Message.DepartmentId = 0;
        this.Message.Subject = " ";
        this.Message.Comment = " ";
        this.customNotification.notify("Message has been saved successfully.", "", Utilities.success);
        this.LoadMessages();
      }));
    }
  }
}
