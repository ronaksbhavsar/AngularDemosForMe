import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignService } from '../../../services/design.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { DesignSubcategoryModel } from '../../../models/DesignSubcategoryModel';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-design-subcategories',
  templateUrl: './design-subcategories.component.html',
  styleUrls: ['./design-subcategories.component.css']
})
export class DesignSubcategoriesComponent implements OnInit, OnDestroy {
  public paramId: string;
  public sectionName: string;
  private subscriptions: Subscription[] = [];
  constructor(public route: ActivatedRoute, public designService: DesignService,
    private router: Router,
    public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(param => this.paramId = param["sectionId"].toLowerCase()));
    this.subscriptions.push(this.subscriptionService.IsDesignFeatureEnabled$.subscribe(isDesignEnabled => {
      if (!isDesignEnabled) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public SetSection(text: string) {
    this.sectionName = text;
  }

}
