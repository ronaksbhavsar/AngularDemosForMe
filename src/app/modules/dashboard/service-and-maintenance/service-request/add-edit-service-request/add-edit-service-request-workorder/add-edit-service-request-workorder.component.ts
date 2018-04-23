import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ServiceRequestWorkorder, ServiceRequestWorkorderAttachment } from '../../../../../../models/ServiceRequestWorkOrderModel';
import { ServiceRequestService } from '../../../../../../services/service-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LookUpModel } from '../../../../../../models/LocationModel';
import { MaterialModel } from '../../../../../../models/MaterialModel';
import { DxGalleryComponent, DxFileUploaderComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { Utilities } from '../../../../../../Utilities';
import { SubscriptionService } from '../../../../../../shared/services/subscription.service';
import { CustomNotification } from '../../../../../../CustomNotification';
import { TempAttachmentModel } from '../../../../../../models/TempAttachementModel';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../../../../shared/services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
// import { readFile } from 'fs';

@Component({
  selector: 'app-add-edit-service-request-workorder',
  templateUrl: './add-edit-service-request-workorder.component.html',
  styleUrls: ['./add-edit-service-request-workorder.component.css']
})
export class AddEditServiceRequestWorkorderComponent implements OnInit, OnDestroy {
  public workOrderDetail: ServiceRequestWorkorder = new ServiceRequestWorkorder();
  public serviceRequestWorkorderTitle: string = "Create Issue";
  @ViewChild("fileuploader") fileUploader: DxFileUploaderComponent;
  public locationData: LookUpModel[] = [];
  public paramUniqueWorkorderId: string;
  public paramServiceRequestId: string;
  private serviceRequestFileCount: number;
  private serviceRequestFileSizePerFile: number;
  public serviceRequestFileType: string;
  public productsData: MaterialModel[] = [];
  public isRoomIDSelect = true;
  public isProductIDSelect = true;
  private subscriptions: Subscription[] = [];
  constructor(public route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    public customNotification: CustomNotification,
    public router: Router, public subscriptionService: SubscriptionService,
    public commonService: CommonService,
    public serviceRequestService: ServiceRequestService) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(param => {
      this.paramUniqueWorkorderId = param["serviceRequestWorkorderId"].toLowerCase();
      this.paramServiceRequestId = param["serviceRequestId"].toLowerCase();
    }));
    if (this.paramUniqueWorkorderId !== "create") {
      this.serviceRequestWorkorderTitle = "Edit Issue";
      let list = this.serviceRequestService.getServiceRequestWorkorder().ServiceRequestWorkorderList;
      if (list.length > 0 && list.some(x => x.UniqueWorkOrderID === this.paramUniqueWorkorderId)) {
        this.workOrderDetail = list.find(x => x.UniqueWorkOrderID === this.paramUniqueWorkorderId);
      }
      if (this.workOrderDetail.RoomID == 0) {
        this.isRoomIDSelect = false;
        this.workOrderDetail.LocationOther = this.workOrderDetail.LocationOther;
      }
    }

    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotID => {
      if (lotID) {
        this.subscriptions.push(this.serviceRequestService.getRooms(lotID).subscribe(locationData => {
          this.locationData = locationData;
          this.locationData.push({ LookupID: 0, LookupTypeID: 0, LookupValue: "Others", LookupStatus: "" });
        }));
      }
    }));

    this.subscriptions.push(this.commonService.serviceRequestFileCount.subscribe(value => this.serviceRequestFileCount = value));
    this.subscriptions.push(this.commonService.serviceRequestFileSizePerFile.subscribe(value => this.serviceRequestFileSizePerFile = value));
    this.subscriptions.push(this.commonService.serviceRequestFileType.subscribe(value => this.serviceRequestFileType = value));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  private isWorkOrderCreate(): boolean {
    return this.paramUniqueWorkorderId === "create";
  }

  public onImageRemove(uniqueAttachmentID: string) {
    Utilities.confirm("Are you sure want to delete?", "Remove Attachment")
      .then((x) => {
        if (x) {
          if (this.workOrderDetail.ServiceRequestWorkorderAttachmentList
            .find(x => x.UniqueAttachmentID === uniqueAttachmentID).IsBase64
            && this.paramUniqueWorkorderId === "create") {
            this.workOrderDetail.ServiceRequestWorkorderAttachmentList
              .splice(this.workOrderDetail.ServiceRequestWorkorderAttachmentList
                .findIndex(x => x.UniqueAttachmentID === uniqueAttachmentID), 1);
          } else {
            this.workOrderDetail.ServiceRequestWorkorderAttachmentList
              .find(x => x.UniqueAttachmentID === uniqueAttachmentID).IsMarkForDelete = true;
          }
          this.fileUploader.instance.reset();
        }
      });
  }

  public onSaveWorkorder() {
    let tempLength = this.workOrderDetail.ServiceRequestWorkorderAttachmentList.filter(x => x.IsMarkForDelete === false).length;
    if (tempLength > this.serviceRequestFileCount) {
      this.customNotification.notify("Number of images are limits to " + this.serviceRequestFileCount + ". please remove extra images.", "", Utilities.warning);
      return false;
    }
    if (this.paramUniqueWorkorderId === "create") {
      this.workOrderDetail.UniqueWorkOrderID = Utilities.generateGuid();
    }

    if (this.workOrderDetail.RoomID != 0) {
      this.workOrderDetail.LocationName = this.locationData
        .find(x => x.LookupID === this.workOrderDetail.RoomID).LookupValue;
    }
    else {
      this.workOrderDetail.LocationName = this.workOrderDetail.LocationOther;
    }
    this.workOrderDetail.Notes = this.workOrderDetail.Notes.trim();
    let index = this.workOrderDetail.
      ServiceRequestWorkorderAttachmentList.map((x, index) => {
        return (x.IsMarkForDelete && !x.IsStoredInDB) ? index : undefined;
      });
    index.filter(x => x != undefined).map(x => {
      this.workOrderDetail.
        ServiceRequestWorkorderAttachmentList.splice(x, 1);
    });
    if (this.workOrderDetail.ServiceRequestWorkorderAttachmentList.length > 0) {
      this.serviceRequestService.insertTempAttachment(this.getTempImages()).subscribe((responseImages: TempAttachmentModel[]) => {
        this.workOrderDetail.ServiceRequestWorkorderAttachmentList.forEach(x => {
          x.FileAccessUrl = responseImages && responseImages.length > 0
            && responseImages.some(y => y.ImageDisplayName === x.UniqueAttachmentID + x.ImageDisplayName) ?
            responseImages.find(y => y.ImageDisplayName === x.UniqueAttachmentID + x.ImageDisplayName).FileAccessUrl
            : x.FileAccessUrl
          x.IsBase64 = false
        });
        this.serviceRequestService.addOrEditServiceRequestWorkOrderDetails(this.workOrderDetail);
        this.navigateToServiceRequest();
      });
    } else {
      this.serviceRequestService.addOrEditServiceRequestWorkOrderDetails(this.workOrderDetail);
      this.navigateToServiceRequest();
    }
  }

  private getTempImages(): TempAttachmentModel[] {
    return this.workOrderDetail.ServiceRequestWorkorderAttachmentList.filter(x => !x.IsStoredInDB).map(y => {
      return {
        ImageDisplayName: y.UniqueAttachmentID + y.ImageDisplayName,
        FileAccessUrl: y.FileAccessUrl,
        IsStoredInDB: false,
        IsMarkForDelete: y.IsMarkForDelete
      };
    });
  }

  public onLocationChanged(e: any) {
    this.isProductIDSelect = true;
    if (!e.value) {
      this.isRoomIDSelect = false;
      this.workOrderDetail.OptionID = 0;
      this.isProductIDSelect = false;
      // this.productsData.push({ MaterialID: 0, MaterialName: "Others" });
    } else {
      this.isRoomIDSelect = true;
      // this.getProducts(e.value);
    }

  }
  public onProductChanged(e: any) {
    if (!e.value) {
      this.isProductIDSelect = false;
    } else {
      this.isProductIDSelect = true;
    }

  }

  public onFileUploadChanged(e: any) {
    let files: File[] = e.value;
    if (files) {
      //check particular file size
      for (let index = 0; index < files.length; index++) {
        let fileTypes = this.serviceRequestFileType.split(',').map(x => x.split("/").pop().toLowerCase());
        let currentFileExtension = files[index].name.split('.').pop().toLowerCase();
        if (!(fileTypes.find(x => x === currentFileExtension))) {
          this.customNotification.notify("Selected file is not allowed.", "", "warning");
          this.fileUploader.instance.reset();
          return false;
        }
        //not greater than 5 mb
        if (files[index].size >= (1024 * 1024 * this.serviceRequestFileSizePerFile)) {
          //this.customNotification.notify("The size of selected file " + files[index].name + " file not greater than 5 Mb.", "", "warning");
          this.customNotification.notify("The file size should be less than " + this.serviceRequestFileSizePerFile + " MB.", "", "warning");
          this.fileUploader.instance.reset();
          return false;
        }
      }

      files.map(attachedFile => {
        let file = new ServiceRequestWorkorderAttachment();
        file.ImageDisplayName = attachedFile.name;
        let reader = new FileReader();
        reader.onload = (event: any) => {
          file.FileAccessUrl = event.target.result;
          file.IsMarkForDelete = false;
          file.IsBase64 = true;
          file.IsImage = !(this.serviceRequestFileType.split(',')
            .find(x => x.includes(attachedFile.name
              .split('.').pop())).toLowerCase().includes('video'));
          file.UniqueAttachmentID = Utilities.generateGuid();
          file.ImageName = file.UniqueAttachmentID + attachedFile.name;
          let fileData = this.workOrderDetail.ServiceRequestWorkorderAttachmentList
            .find(x => x.ImageDisplayName === (attachedFile.name).toString());
          if (!fileData) {
            this.workOrderDetail.ServiceRequestWorkorderAttachmentList.push(file);
          } else {
            fileData.IsMarkForDelete = false;
          }
        }
        reader.readAsDataURL(attachedFile);
      })
    }
  }

  public onBackButtonClick() {
    this.navigateToServiceRequest();
  }

  public navigateToServiceRequest() {
    this.router.navigate(['/ServicesMaintenance/ServiceRequest/' + this.paramServiceRequestId]);
  }
}
