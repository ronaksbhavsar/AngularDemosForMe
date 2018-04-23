import { UploadFile, UploadProgress } from "ngx-uploader";
import { Subscription } from "rxjs/Subscription";

export class BuyerUploadModel {
    ProjectName: string;
    ProjectId: string;
    CommunityId: number;
    CommDescription: string;
    LotNo: string;
    TaskName: string;
    TaskID: number;
    CommunityLotId: number;
    ImageName?: any;
    ImageLink?: any;
    UploadedFiles: FileUploadModel[] = [];
}

export class FileUploadModel {
    ImageName: string;
    ImageLink: string;
    FileAccessUrl: String;
    CommunityLotPictureId: number;
}

export class FilePreviewUploadModel {
    id: string;
    FileAccessUrl: String;
}
