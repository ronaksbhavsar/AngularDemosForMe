import { Component, OnInit, OnDestroy } from '@angular/core';
import { DesignService } from '../../../services/design.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { DesigncategoryModel } from '../../../models/DesignCategoryModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit, OnDestroy {
  public categoriesList: DesigncategoryModel[] = [];
  public paramId: string;
  private subscriptions: Subscription[] = [];
  constructor(public designService: DesignService,
    public subscriptionService: SubscriptionService,
    public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(param => this.paramId = param["buyerWishListChangeOrderId"].toLowerCase()));
    this.subscriptions.push(this.designService.categoriesList.subscribe(list => {
      if (list) {
        this.categoriesList = list;
      }
    }));
    this.subscriptions.push(this.subscriptionService.IsDesignFeatureEnabled$.subscribe(isDesignEnabled => {
      if (isDesignEnabled === false) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  public onImageClick(event: any) {
    let selectedItem: DesigncategoryModel = event.itemData;
    this.router.navigate(['/design/designSubCategories/' + selectedItem.SectionId + '/buyerWishListChangeOrderId/' + this.paramId]);
  }

  public onBackClick($event: any) {
    this.router.navigate(['/design/']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
