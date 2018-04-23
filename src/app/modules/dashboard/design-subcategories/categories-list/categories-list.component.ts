import { Component, OnInit, ViewChild, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { DesignSubcategoryModel } from '../../../../models/DesignSubcategoryModel';
import { DesignService } from '../../../../services/design.service';
import { DesigncategoryModel } from '../../../../models/DesignCategoryModel';
import { DxDataGridComponent } from 'devextreme-angular';
import { Utilities } from '../../../../Utilities';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dashboard-design-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  public categoriesList: DesigncategoryModel[] = [];
  public selectedSectionId: number;
  @Output() setSectionText = new EventEmitter<any>();
  public sectionId: number;
  selectedRows: number[];
  public isSelected: boolean = false;
  @ViewChild("categoriesGrid") categoriesGrid: DxDataGridComponent;
  private subscriptions: Subscription[] = [];
  constructor(public route: ActivatedRoute, public designService: DesignService,
    public subscriptionService: SubscriptionService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.sectionId = +params["sectionId"];
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.designService.categoriesList.subscribe(list => {
      if (list.length > 0) {
        this.categoriesList = list;
        this.selectedRows = [+this.sectionId];
        this.designService.selectedSectionId.next(+this.sectionId);
        this.setSectionText.emit(this.categoriesList.find(x => x.SectionId === this.sectionId).SectionName);
      }
    }));
  }

  public onCategorySelection(event: any) {
    let selectedItem: DesigncategoryModel = event.selectedRowsData[0];
    if (selectedItem) {
      this.setSectionText.emit(selectedItem.SectionName);
      if (this.isSelected) {
        this.subscriptionService.designGridChanges$.next(selectedItem);
      }
      this.isSelected = true;
      this.designService.selectedSectionId.next(selectedItem.SectionId);
    }
  }

}
