import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerUploadService } from '../../../services/buyer-upload.service';
import { CommonDropdownModel } from '../../../Models/ProjectModel';
import { BuyerUploadModel, FileUploadModel, FilePreviewUploadModel } from '../../../Models/BuyerUploadModel';
import { SubscriptionService } from '../../../../../../shared/services/subscription.service';
import { Subscription } from 'rxjs/Subscription';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { environment } from '../../../../../../../environments/environment';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { NgxCarousel } from 'ngx-carousel';
import { Utilities } from '../../../../../../Utilities';
import { CustomNotification } from '../../../../../../CustomNotification';
import { CommonService } from '../../../../../../shared/services/common.service';


@Component({
  selector: 'app-add-edit-upload',
  templateUrl: './add-edit-upload.component.html',
  styleUrls: ['./add-edit-upload.component.css']
})
export class AddEditUploadComponent implements OnInit, OnDestroy {
  interFaceTitle: string = "Create Buyer Upload";
  paramTaskId: string;
  previewImages: FilePreviewUploadModel[] = [];
  files: UploadFile[] = [];
  buyerUploadModel: BuyerUploadModel = new BuyerUploadModel();
  constructionMilestones: CommonDropdownModel[] = [];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  options: UploaderOptions;
  dragOver: boolean;
  private subscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private customNotification: CustomNotification,
    private buyerUploadService: BuyerUploadService,
    private subscriptionService: SubscriptionService) {
    this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png'] };
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue     
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added          
      this.previewImage(output.file.nativeFile).then(response => {
        let previewData = new FilePreviewUploadModel();
        previewData.FileAccessUrl = response as string;
        previewData.id = output.file.id;
        this.previewImages.push(previewData); // The image preview
        this.files.push(output.file);
      });
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      if (this.files.length > 0 && this.files[this.files.length - 1].id === output.file.id) {
        this.router.navigate(['/buyerUpload/']);
        this.customNotification.notify("File(s) have been uploaded successfully.", "", Utilities.success)
      }
    }
  }

  public getPreviewFile(id: string) {
    return this.previewImages.find(x => x.id === id).FileAccessUrl;
  }

  // The preview function
  previewImage(file: any) {
    const fileReader = new FileReader();
    return new Promise(resolve => {
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e: any) {
        resolve(e.target.result);
      }
    });
  }

  removeFile(id: string): void {
    Utilities.confirm("Are you sure want to delete?", "Remove Attachment")
      .then((x) => {
        if (x) {
          this.uploadInput.emit({ type: 'cancel', id: id });
          this.uploadInput.emit({ type: 'remove', id: id });
          let index = this.previewImages.findIndex(x => x.id === id);
          this.previewImages.splice(index, 1);
        }
      });
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(param => this.paramTaskId = param["taskId"].toLowerCase()));
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.buyerUploadService.getConstructionMilestoneByCommunityLotId(lotId).subscribe(x => {
          this.constructionMilestones = x ? x.ConstructionMilestone : [];
        });
        if (this.paramTaskId !== "create") {
          this.interFaceTitle = "Edit Buyer Upload";
          if (+this.paramTaskId !== 0 && this.paramTaskId !== "create") {
            this.buyerUploadModel.TaskID = +this.paramTaskId;
          }
        }
      }
    }));
    this.subscriptions.push(this.commonService.AuthUser.subscribe(x => {
      if (x && x.BuyerID !== 0) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  public onSave(form: any) {
    const event: UploadInput = {
      type: 'uploadAll',
      url: environment.origin + '/BuyerUploadInterface/Upload',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(environment.token) },  // <----  set headers
      method: 'POST',
      data: {
        CommunityLotId: this.subscriptionService.CommunityLotId$.getValue() + "",
        TaskID: this.buyerUploadModel && this.buyerUploadModel.TaskID ?
          this.buyerUploadModel.TaskID + "" : ("0" as string)
      }
    };
    this.uploadInput.emit(event);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onBackClick() {
    this.router.navigate(['/buyerUpload/']);
  }

  public onBackButtonClick() {
    this.router.navigate(['/buyerUpload/']);
  }

}
