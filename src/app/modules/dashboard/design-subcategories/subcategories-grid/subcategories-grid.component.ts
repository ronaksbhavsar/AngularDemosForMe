import { Component, OnInit, Input, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { DesignService } from '../../../../services/design.service';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { DesignSubcategoryModel, FloorModel, FloorPriceModel, InsertFloorModel } from '../../../../models/DesignSubcategoryModel';
import { DxPopupComponent, DxDataGridComponent, DxTextBoxComponent } from 'devextreme-angular';
import { OptionModel, InsertBuyerWishListRequestModel } from '../../../../models/OptionModel';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
import { CustomNotification } from '../../../../CustomNotification';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { environment } from '../../../../../environments/environment';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'dashboard-subcategories-grid',
  templateUrl: './subcategories-grid.component.html',
  styleUrls: ['./subcategories-grid.component.css']
})
export class SubcategoriesGridComponent implements OnInit, OnDestroy {
  @ViewChild("optionGrid") optionGrid: DxDataGridComponent;
  @ViewChild("subSectionGrid") subSectionGrid: DxDataGridComponent;
  @ViewChild("flooringGrid") flooringGrid: DxDataGridComponent;
  @ViewChild("optionPopup") optionPopup: DxPopupComponent;
  public designSubCategoriesData: DesignSubcategoryModel[] = [];
  public optionList: OptionModel[] = [];
  public isFlooring: boolean = false;
  public selectedOption: OptionModel = new OptionModel();
  public currentSubCategory: DesignSubcategoryModel = new DesignSubcategoryModel();
  public selectedOptionId: number[] = [];
  public paramsBuyerWishListChangeOrderId: string;
  public floorList: FloorModel[] = [];
  public static colorText = Utilities.colorText.toLowerCase();
  private subscriptions: Subscription[] = [];
  constructor(public designService: DesignService,
    public subscriptionService: SubscriptionService,
    public customNotification: CustomNotification,
    public router: Router,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(param => this.paramsBuyerWishListChangeOrderId = param["buyerWishListChangeOrderId"].toLowerCase()));
    this.subscriptions.push(this.designService.selectedSectionId.subscribe(sectionId => {
      if (sectionId) {
        let categoryName = this.getCategotyName(sectionId);
        if (categoryName.toLowerCase() === environment.sectionName.toLowerCase()) {
          this.isFlooring = true;
          this.getFloorOptions();
        } else {
          this.isFlooring = false;
          this.getSubCategoryList(sectionId);
        }
      }
    }));
  }

  private getFloorOptions() {
    this.subscriptions.push(this.designService.getFloorOptions(this.subscriptionService.CommunityLotId$.getValue(), this.isEditMode() ? +this.paramsBuyerWishListChangeOrderId : 0).subscribe(x => {
      this.floorList = x && x.flooroption ? x.flooroption : [];
    }));
  }

  onShown(event: any) {
    Utilities.setTitleDxPopup(event);
  }

  private getCategotyName(sectionId: number) {
    return this.designService.categoriesList.getValue()
      ? this.designService.categoriesList.getValue()
        .some(x => x.SectionId === sectionId) ? this.designService.categoriesList.getValue()
          .find(x => x.SectionId === sectionId).SectionName : ""
      : "";
  }

  public getSubCategoryList(sectionId: number) {
    if (sectionId && this.subscriptionService.CommunityLotId$.getValue()) {
      this.subscriptions.push(this.designService.getOptionsSubCategoriesByCommunityLotId(this.subscriptionService.CommunityLotId$.getValue(), +(sectionId), this.isEditMode() ? +this.paramsBuyerWishListChangeOrderId : 0).subscribe(data => {
        this.designSubCategoriesData = data ? data.optionssubcategories : [];
      }));
    }
  }

  public onMaterialValueChanged(event: any, data: FloorModel) {
    let materialName = data.GetFlooringMaterialList.some(x => x.ID === event.value)
      ? data.GetFlooringMaterialList.find(x => x.ID === event.value).Name : "";
    this.floorList.find(x => x.UniqueId === data.UniqueId).IsDisplayGrout =
      materialName.toLowerCase().indexOf(environment.tile.toLowerCase()) > 0;
    this.upgradedPrice(data);
  }

  public onTextboxValueChanged(data: FloorModel) {
    this.upgradedPrice(data);
  }

  private upgradedPrice(floorData: FloorModel) {
    let floorPriceModel = new FloorPriceModel();
    floorPriceModel.CarpetPad = floorData.CarpetPad;
    floorPriceModel.ChangeOrderID = floorData.ChangeOrderFlooringID;
    floorPriceModel.CommID = floorData.CommunityID;
    floorPriceModel.CommunityLotId = this.subscriptionService.CommunityLotId$.getValue();
    floorPriceModel.flg = "P";
    floorPriceModel.P45Angle = floorData.TileWood45Angle;
    floorPriceModel.PackageID = 0;
    floorPriceModel.PlanID = floorData.PlanID;
    floorPriceModel.ProjID = floorData.ProjectID;
    floorPriceModel.RoomID = floorData.RoomID;
    floorPriceModel.UpgradeMaterialID = floorData.OptionID;
    this.subscriptions.push(this.designService.getFlooringUpgradePrice(floorPriceModel).subscribe(x => {
      let currentRow = this.floorList.find(x => x.UniqueId === floorData.UniqueId);
      if (currentRow) {
        currentRow.OptionPrice = x && x.Price ? x.Price : 0;
      }
    }));
  }

  public onCancelAllClick(event: any) {
    this.router.navigate(["/design/"]);
  }

  public onSubmitOptionsDataClick(event: any) {
    this.submitAllRows();
  }

  public submitAllRows() {
    if (this.isFlooring) {
      let insertFloorList: InsertFloorModel[] = this.floorList.map(x => {
        return {
          CommunityLotId: this.subscriptionService.CommunityLotId$.getValue(),
          ChangeOrderFlooringID: x.ChangeOrderFlooringID,
          RoomID: x.RoomID,
          UserID: 0,
          OptionID: x.OptionID,
          OptionRemarks: x.OptionRemarks,
          OptionPrice: x.OptionPrice,
          SeqNo: 0,
          SectionDataID: 0,
          TileWood45Angle: x.TileWood45Angle,
          CarpetPad: x.CarpetPad,
          ColorID: x.ColorId,
          GroutID: x.GroutLookupID,
          BuyerWishListChangeOrderID: this.isEditMode() ? +this.paramsBuyerWishListChangeOrderId : 0
        }
      });
      this.subscriptions.push(this.designService.insertProcessContractFlooring(insertFloorList).subscribe(x => {
        this.paramsBuyerWishListChangeOrderId = (x.UpdatedBuyerWishListChangeOrderID as string).toString();
        this.getFloorOptions();
        this.flooringGrid.instance.refresh();
        this.customNotification.notify(x.Message, "", Utilities.success);
      }));
    } else {
      let insertRecords: InsertBuyerWishListRequestModel[] = this.designSubCategoriesData.map((x) => {
        return {
          buyerId: 0,
          CommunityLotId: this.subscriptionService.CommunityLotId$.getValue(),
          SectionDataId: x.SectionDataID,
          TradeTypeId: x.TradeTypeID,
          MaterialCategoryId: x.MaterialCategoryID,
          MaterialId: x.SelectedOptionID,
          ColorId: x.GetColorsForMaterialViewModelList.length > 0 ? x.colorID : 0,
          RoomId: x.RoomID,
          Price: x.OptionPrice,
          UserId: 0,
          OptionRemarks: x.OptionRemarks.trim(),
          Quantity: x.OptionQuantity,
          OptionQuote: "", // mark for edit
          IsAdded: false,
          BuyerWishListChangeOrderID: this.isEditMode() ? +this.paramsBuyerWishListChangeOrderId : 0
        };
      });
      this.subscriptions.push(this.designService.insertBuyerWishlist(insertRecords).subscribe((x) => {
        if (x && x.IsExceedColorsheet) {
          this.customNotification.notify("You can not create more than " + environment.colorSheetLimit + " colorsheets.", "", Utilities.warning);
          this.router.navigate(["/design/"]);
          return;
        } else {
          this.paramsBuyerWishListChangeOrderId = (x.UpdatedBuyerWishListChangeOrderID as string).toString();
          this.refreshSubCategoriesList();
          this.subSectionGrid.instance.refresh();
          this.customNotification.notify(x.Message, "", Utilities.success);
        }
      }));
    }
  }

  public isEditMode(): boolean {
    return this.paramsBuyerWishListChangeOrderId.toLowerCase() !== "create"
      ? true : false;
  }

  public onOptionClick(designSubCategoriesData: DesignSubcategoryModel) {
    this.currentSubCategory = designSubCategoriesData;
    this.subscriptions.push(this.designService.getOptionsByCommunityLotId(this.currentSubCategory.SectionDataID,
      this.currentSubCategory.TradeTypeID, this.currentSubCategory.MaterialCategoryID,
      this.subscriptionService.CommunityLotId$.getValue(),
      this.isEditMode() ? +this.paramsBuyerWishListChangeOrderId : 0).subscribe((x) => {
        this.optionList = x ? x.option : [];
        this.selectedOptionId = [this.currentSubCategory.SelectedOptionID];
        this.optionPopup.instance.show();
      }));
  }

  public onOptionSelection(event: any) {
    this.selectedOption = event.currentSelectedRowKeys[0];
  }

  public onHidingPopup(event: any) {
    this.optionGrid.instance.deselectAll();
  }

  public onHidingSelectedOptionPopup(event: any) {
    this.optionGrid.instance.deselectAll();
  }

  public onCancelClick(event: any) {
    this.optionPopup.instance.hide();
  }

  public onSubmitClick(event: any) {
    if (this.optionGrid.instance.getSelectedRowsData()[0]["Quantity"] === "") {
      this.customNotification.notify("Please enter quantity.", "", Utilities.warning);
      return;
    }
    if (this.optionGrid.instance.getSelectedRowKeys().length === 0) {
      this.customNotification.notify("Please select atleast one option.", "", Utilities.warning);
      return;
    }
    let selectedRow: OptionModel = this.optionGrid.instance.getSelectedRowsData()[0];
    let insertBuyerWishListRequestModel: InsertBuyerWishListRequestModel = new InsertBuyerWishListRequestModel();
    insertBuyerWishListRequestModel.CommunityLotId = this.subscriptionService.CommunityLotId$.getValue();
    insertBuyerWishListRequestModel.ColorId = 0;
    insertBuyerWishListRequestModel.buyerId = 0;
    insertBuyerWishListRequestModel.IsAdded = false;
    insertBuyerWishListRequestModel.MaterialCategoryId = selectedRow.MaterialCategoryID;
    insertBuyerWishListRequestModel.MaterialId = selectedRow.MaterialID;
    insertBuyerWishListRequestModel.OptionQuote = selectedRow.OptionQuote;
    insertBuyerWishListRequestModel.OptionRemarks = this.currentSubCategory.OptionRemarks;
    insertBuyerWishListRequestModel.Price = selectedRow.RetailPrice;
    insertBuyerWishListRequestModel.Quantity = selectedRow.Quantity;
    insertBuyerWishListRequestModel.RoomId = selectedRow.RoomID;
    insertBuyerWishListRequestModel.SectionDataId = selectedRow.SectionDataID;
    insertBuyerWishListRequestModel.TradeTypeId = selectedRow.TradeTypeID;
    insertBuyerWishListRequestModel.UserId = 0;
    insertBuyerWishListRequestModel.BuyerWishListChangeOrderID = this.isEditMode() ? +this.paramsBuyerWishListChangeOrderId : 0;
    this.subscriptions.push(this.designService.insertBuyerWishlist([insertBuyerWishListRequestModel]).subscribe((x) => {
      if (x && x.IsExceedColorsheet) {
        this.customNotification.notify("You can not create more than " + environment.colorSheetLimit + " colorsheets.", "", Utilities.warning);
        this.optionPopup.instance.hide();
        this.router.navigate(["/design/"]);
        return;
      } else {
        this.paramsBuyerWishListChangeOrderId = (x.UpdatedBuyerWishListChangeOrderID as string).toString();
        this.refreshSubCategoriesList();
        this.optionGrid.instance.refresh();
        this.customNotification.notify(x.Message, "", Utilities.success);
        this.optionPopup.instance.hide();
      }
    }));
  }

  public refreshSubCategoriesList() {
    this.getSubCategoryList(this.designService.selectedSectionId.getValue());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}