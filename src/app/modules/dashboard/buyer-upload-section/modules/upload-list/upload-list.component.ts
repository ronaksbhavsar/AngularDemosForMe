import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuyerUploadService } from '../../services/buyer-upload.service';
import { BuyerUploadModel, FileUploadModel } from '../../Models/BuyerUploadModel';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SubscriptionService } from '../../../../../shared/services/subscription.service';
import { Utilities } from '../../../../../Utilities';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit, OnDestroy {
  uploadList: Array<BuyerUploadModel> = [];
  uploadedFiles: FileUploadModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private buyerUploadService: BuyerUploadService,
    private subscriptionService: SubscriptionService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.buyerUploadService.getBuyerUploadInterfaceListByBuyerId(lotId).subscribe(x => {
          this.uploadList = x && x.buyeruploadinterface ? x.buyeruploadinterface : [];
        });
      }
    }));
    this.subscriptions.push(this.commonService.AuthUser.subscribe(x => {
      if (x && x.BuyerID !== 0) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  public onRemoveImage(uploadedFiles: FileUploadModel, taskId: number) {
    Utilities.confirm("Are you sure want to delete?", "Remove Attachment")
      .then((x) => {
        if (x) {
          this.buyerUploadService.deleteCommunityLotPictureByCommunityLotId(uploadedFiles,
            this.subscriptionService.CommunityLotId$.getValue(), taskId).subscribe(x => {
              let uploadData = this.uploadList.find(x => x.TaskID === taskId);
              if (x && x.buyeruploadinterface && x.buyeruploadinterface.CommunityLotPictures) {
                uploadData.UploadedFiles = x.buyeruploadinterface.CommunityLotPictures;
              } else {
                uploadData.UploadedFiles = [];
              }
            });
        }
      })
  }

  public onRowExpanding(event: any) {
    this.buyerUploadService.getBuyerUploadInterfaceListByCommunityLotId(event.key.CommunityLotId, +event.key.TaskID).subscribe(x => {
      let uploadData = this.uploadList.find(x => x.TaskID === +event.key.TaskID);
      if (x && x.buyeruploadinterface && x.buyeruploadinterface.CommunityLotPictures) {
        uploadData.UploadedFiles = x.buyeruploadinterface.CommunityLotPictures;
      } else {
        uploadData.UploadedFiles = [];
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddEditClick(data: string) {
    this.router.navigate(['/buyerUpload/' + data]);
  }

}
