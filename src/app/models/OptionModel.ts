export class OptionModel {
    public MaterialID: number;
    public MaterialName: string;
    public RetailPrice: number;
    public SectionDataID: number;
    public TradeTypeID: number;
    public MaterialCategoryID: number;
    public ProjectID: number;
    public AllComm: boolean;
    public CommID: number;
    public PlanID: number;
    public RoomID: number;
    public ChangeOrderOptionID: number;
    public OptionQuote: string;
    public Selected: string;
    public OptionRemarks: string;
    public Quantity: number;
    public ColorName: string;
    public ShowQty: boolean;
    public ShowMore: boolean;
    public IsPackageSelected: boolean;
    public TotalPrice: number;
}

export class InsertBuyerWishListRequestModel {
    public buyerId: number;
    public CommunityLotId: number;
    public SectionDataId: number;
    public TradeTypeId: number;
    public MaterialCategoryId: number;
    public MaterialId: number;
    public ColorId: number;
    public RoomId: number;
    public Price: number;
    public UserId: number;
    public OptionRemarks: string;
    public Quantity: number;
    public OptionQuote: string;
    public IsAdded: boolean;
    public BuyerWishListChangeOrderID: number;
}