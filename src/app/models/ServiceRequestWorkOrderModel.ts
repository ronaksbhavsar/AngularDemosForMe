import { ServiceRequestModel } from "./ServiceRequestModel";

export class ServiceRequestWorkorder {
    public ServiceRequestWorkorderID: number;
    public OpenDate: Date;
    public DueDate: Date;
    public OptionCategoryID: number;
    public OptionSubcategoryID: number;
    public OptionID: number;
    public Notes: string;
    public LocationID: number;
    public RoomID: number;
    public LocationName: string;
    public MaterialName: string;
    public ServiceRequestID: number;
    public UniqueWorkOrderID: string;
    public ServiceRequestWorkorderAttachmentList: ServiceRequestWorkorderAttachment[] = [];
    public IsMarkForDelete: boolean;
    public LocationOther: string;
    public ProductOther: string;
}

export class ServiceRequestAvailabilityModel {
    public ServiceRequestAvailabilityID: number;
    public ServiceRequestID: number;
    public IsMon: boolean;
    public IsTue: boolean;
    public IsWed: boolean;
    public IsThu: boolean;
    public IsFri: boolean;
    public IsSat: boolean;
    public IsSun: boolean;
    public MonStart: Date | string;
    public MonEnd: Date | string;
    public TueStart: Date | string;
    public TueEnd: Date | string;
    public WedStart: Date | string;
    public WedEnd: Date | string;
    public ThuStart: Date | string;
    public ThuEnd: Date | string;
    public FriStart: Date | string;
    public FriEnd: Date | string;
    public SatStart: Date | string;
    public SatEnd: Date | string;
    public SunStart: Date | string;
    public SunEnd: Date | string;

    public OtherAvailability: string;
}

export class DisplayAvailabilityModel {
    public MonStart: string;
    public MonEnd: string;
    public TueStart: string;
    public TueEnd: string;
    public WedStart: string;
    public WedEnd: string;
    public ThuStart: string;
    public ThuEnd: string;
    public FriStart: string;
    public FriEnd: string;
    public SatStart: string;
    public SatEnd:  string;
    public SunStart:  string;
    public SunEnd:  string;
}

export class LocalStorageList {
    public ServiceRequestWorkorderList: ServiceRequestWorkorder[] = [];
    public DeletedServiceRequestWorkorder: ServiceRequestWorkorder[] = [];
}

export class ServiceRequestPostModel {
    public ServiceRequestWorkorder: ServiceRequestWorkorder[] = [];
    public ServiceRequestAvailability: ServiceRequestAvailabilityModel;
    public ServiceRequest: ServiceRequestModel;
}

export class ServiceRequestWorkorderAttachment {
    public ServiceRequestWorkorderAttachmentID: number;
    public ServiceRequestWorkorderID: number;
    public ImageLink: string;
    public ImageDisplayName: string;
    public ImageName: string;
    public Status: boolean;
    public FileAccessUrl: string;
    public IsImage: boolean;
    public IsMarkForDelete: boolean;
    public IsBase64: boolean;
    public IsStoredInDB: boolean;
    public UniqueAttachmentID: string;
}