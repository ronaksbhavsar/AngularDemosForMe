import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
import { SubscriptionService } from '../shared/services/subscription.service';
import { DesigncategoryModel } from '../models/DesignCategoryModel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InsertBuyerWishListRequestModel } from '../models/OptionModel';
import { FloorPriceModel, InsertFloorModel } from '../models/DesignSubcategoryModel';

@Injectable()
export class DesignService {
  public categoriesList = new BehaviorSubject<DesigncategoryModel[]>([]);
  public selectedSectionId = new BehaviorSubject<number>(null);
  constructor(public http: HttpClientService,
    public subscriptionService: SubscriptionService) {
    this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {        
        this.getOptionsCategoriesByCommunityLotId(lotId).subscribe(categories => {
          if (categories && categories.optionscategories) {
            this.categoriesList.next(categories.optionscategories);
          }
        });
      }
    });
  }

  public getFloorOptions(communityLotId: number, buyerWishListChangeOrderID: number) {
    return this.http.get('/Sales/GetFloorOptions?CommunityLotId=' + communityLotId +
      "&&BuyerWishListChangeOrderID=" + buyerWishListChangeOrderID);
  }

  public getFlooringUpgradePrice(floorPriceModel: FloorPriceModel) {
    return this.http.post('/Sales/GetFlooringUpgradePrice', floorPriceModel);
  }

  public getOptionsCategoriesByCommunityLotId(communityLotId: number) {
    return this.http.get('/Sales/GetOptionsCategoriesByCommunityLotId?CommunityLotId=' + communityLotId);
  }

  public getOptionsSubCategoriesByCommunityLotId(communityLotId: number, sectionId: number, buyerWishListChangeOrderID: number) {
    return this.http.get('/Sales/GetOptionsSubCategoriesByCommunityLotId?CommunityLotId=' + communityLotId + "&&SectionId=" + sectionId + "&&BuyerWishListChangeOrderID=" + buyerWishListChangeOrderID);
  }

  public getOptionsByCommunityLotId(sectionDataID: number, tradeID: number, matCatID: number, communityLotId: number, buyerWishListChangeOrderID: number) {
    return this.http.get('/Sales/GetOptionsByCommunityLotId?SectionDataID=' + sectionDataID + "&&TradeID=" + tradeID + "&&MatCatID=" + matCatID + "&&CommunityLotId=" + communityLotId + "&&BuyerWishListChangeOrderID=" + buyerWishListChangeOrderID);
  }

  public insertBuyerWishlist(insertBuyerWishListRequestModel: InsertBuyerWishListRequestModel[]) {
    return this.http.post('/Sales/InsertBuyerWishlist', insertBuyerWishListRequestModel);
  }

  public insertProcessContractFlooring(insertFloorModel: InsertFloorModel[]) {
    return this.http.post('/Sales/InsertProcessContractFlooring', insertFloorModel);
  }

  public getColorsForMaterial(tradeTypeID: number, communityLotId: number, materialID: number) {
    return this.http.get('/Sales/GetColorsForMaterial?TradeTypeID=' + tradeTypeID + "&&CommunityLotId=" + communityLotId + "&&MaterialID=" + materialID);
  }

  public getBuyerWishListChangeOrder(communityLotId: number) {
    return this.http.get('/Sales/GetBuyerWishListChangeOrder?CommunityLotId=' + communityLotId);
  }

  public getCompareColorSheetData(communityLotId: number) {
    return this.http.get('/Sales/GetCompareColorSheetData?CommunityLotId=' + communityLotId);
  }
}
