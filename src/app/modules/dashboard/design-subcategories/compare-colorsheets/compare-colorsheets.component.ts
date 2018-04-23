import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Subscription } from 'rxjs/Subscription';
import { DesignService } from '../../../../services/design.service';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxPivotGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-colorsheets',
  templateUrl: './compare-colorsheets.component.html',
  styleUrls: ['./compare-colorsheets.component.css']
})
export class CompareColorsheetsComponent implements OnInit, OnDestroy {
  public pivotGridDataSource: any;
  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  private subscriptions: Subscription[] = [];

  constructor(public subscriptionService: SubscriptionService, private router: Router,
    public designService: DesignService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe((lotId) => {
      if (lotId) {
        this.designService.getCompareColorSheetData(lotId).subscribe(x => {
          let colorSheetsData = x ? x.colorsheet : [];
          this.pivotGridDataSource = {
            fields: [{
              caption: "SectionName",
              width: 120,
              dataField: "SectionName",
              area: "row",
              sortBySummaryField: "Total"
            }, {
              caption: "SectionCategory",
              dataField: "SectionCategory",
              width: 150,
              area: "row"
            },
            {
              caption: "Option",
              dataField: "Option",
              width: 150,
              area: "row"
            }, {
              dataField: "ColorsheetName",
              dataType: "ColorsheetName",
              area: "column"
            }, {
              groupName: "BuyerWishListChangeOrderID",
              visible: false
            },
            {
              caption: "Price",
              dataField: "OptionPrice",
              dataType: "number",
              summaryType: "sum",
              format: "currency",
              area: "data",
              customizeText: ((e) => e.value === 0 ? "" : e.valueText)
            }],
            store: colorSheetsData
          }
        });
      }
    }));
    this.subscriptions.push(this.subscriptionService.IsDesignFeatureEnabled$.subscribe(isDesignEnabled => {
      if (!isDesignEnabled) {
        this.router.navigate(['/dashboard/']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
