export class DesignSubcategoryModel {
    public SectionID: number;
    public SectionNo: number;
    public SectionName: string;
    public SectionDtlNo: number;
    public OptionCategory: string;
    public SectionDtlID: number;
    public SectionDataID: number;
    public RoomID: number;
    public colorID: number;
    public ProjectID: number;
    public CommID: number;
    public AllComm: boolean;
    public PlanID: number;
    public TradeTypeID: number;
    public MaterialCategoryID: number;
    public SelectedOptionID: number;
    public MaterialName: string;
    public ColorName: string;
    public OptionRemarks: string;
    public MatCategoryName?: any;
    public OptionPrice: number;
    public OptionQuantity: number;
    public SeqNo: number;
    public SortNo: number;
    public More: boolean;
    public LockoutWeek: number;
    public IsPackageSelected: boolean;
    public ShowShaded: boolean;
    public COOptionID: number;
    public OverrideSelectRestriction: boolean;
    public GetColorsForMaterialViewModelList: GetColorsFromMaterialModel[];
}


export class GetColorsFromMaterialModel {
    public TTConfigDtlName: string;
    public MaterialAttributeDetailID: number;
}

export class CommonDropdownModel {
    public ID: number;
    public Name: string;
}


export class FloorModel {
    public AreaNumber: number;
    public Room: string;
    public Story: string;
    public MaterialName: string;
    public OptionID: number;
    public FlSelectionID: number;
    public TileWood45Angle: boolean;
    public CarpetPad: boolean;
    public FlSelection: string;
    public ChangeOrderFlooringID: number;
    public RoomID: number;
    public OptionPrice: number;
    public ProjectID: number;
    public CommunityID: number;
    public PlanID: number;
    public OptionRemarks: string;
    public ColorName: string;
    public MaterialCategoryID: number;
    public GroutLookupID: number;
    public SortNo: number;
    public IsPackageSelected: boolean;
    public SqFt: number;
    public GetColorsForMaterialViewModelList: GetColorsFromMaterialModel[] = [];
    public GetFlooringMaterialList: CommonDropdownModel[] = [];
    public GetGroutNamesList: CommonDropdownModel[] = [];
    public UniqueId: string;
    public ColorId: number;
    public IsDisplayGrout: boolean;
}

export class FloorPriceModel {
    public ProjID: number;
    public CommID: number;
    public PlanID: number;
    public RoomID: number;
    public UpgradeMaterialID: number;
    public ChangeOrderID: number;
    public CommunityLotId: number;
    public P45Angle: boolean;
    public CarpetPad: boolean;
    public flg: string;
    public PackageID: number;
}

export class InsertFloorModel {
    public CommunityLotId: number;
    public ChangeOrderFlooringID: number;
    public RoomID: number;
    public UserID: number;
    public OptionID: number;
    public OptionRemarks: string;
    public OptionPrice: number;
    public SeqNo: number;
    public SectionDataID: number;
    public TileWood45Angle: boolean;
    public CarpetPad: boolean;
    public ColorID: number;
    public GroutID: number;
    public BuyerWishListChangeOrderID: number;
}
