import { Component, OnInit, OnDestroy } from '@angular/core';
import { DesignService } from '../../../services/design.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { BuyerWishlistChangeorderModel } from '../../../models/BuyerwishlistChangeorderModel';
import { Utilities } from '../../../Utilities';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomNotification } from '../../../CustomNotification';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard-colorsheet',
  templateUrl: './colorsheet.component.html',
  styleUrls: ['./colorsheet.component.css']
})
export class ColorsheetComponent implements OnInit, OnDestroy {
  public colorSheetList: BuyerWishlistChangeorderModel[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public designService: DesignService,
    public subscriptionService: SubscriptionService,
    public customNotification: CustomNotification,
    public router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe((lotId) => {
      if (lotId) {
        this.designService.getBuyerWishListChangeOrder(lotId).subscribe(x => {
          this.colorSheetList = x ? x.buyerwishlistChangeorder : [];
          this.colorSheetList.forEach((x) => {
            x.BuyerWishListChangeOrderDateString = Utilities.convertToStandardDateFormat(x.BuyerWishListChangeOrderDate);
          });
        });
      }
    }));
    this.subscriptions.push(this.subscriptionService.IsDesignFeatureEnabled$.subscribe(isDesignEnabled => {
      if (isDesignEnabled === false) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddEditClick(routeParams: string) {
    if (routeParams === "create" && this.colorSheetList.length >= environment.colorSheetLimit) {
      this.customNotification.notify("You can not create more than " + environment.colorSheetLimit + " colorsheets.", "", Utilities.warning);
      return;
    }
    this.router.navigate(['/design/', routeParams]);
  }

  public onCompareClick() {
    this.router.navigate(['/design/CompareColorsheets/']);
  }

}
