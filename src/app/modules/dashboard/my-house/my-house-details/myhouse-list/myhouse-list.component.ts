import { Component, OnInit, Input, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { MyhouseService } from '../.././../../../services/myhouse.service';
import { MyHouseModel } from "../../../../../models/MyHouseModel";
import { DxDataGridComponent } from 'devextreme-angular';
import { ActivatedRoute } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-myhouse-list',
  templateUrl: './myhouse-list.component.html',
  styleUrls: ['./myhouse-list.component.css']
})
export class MyhouseListComponent implements OnInit, OnDestroy {

  @Output() setSectionText = new EventEmitter<any>();
  public myHouseModelList: MyHouseModel[] = [];
  public selectedSectionId: number;
  public sectionId: number;
  selectedRows: number[];
  @ViewChild("myHouseGrid") myHouseGrid: DxDataGridComponent;
  private subscriptions: Subscription[] = [];

  constructor(public myhouseService: MyhouseService, public route: ActivatedRoute) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.sectionId = +params["sectionId"];
      this.subscriptions.push(this.myhouseService.myhouseList.subscribe(list => {
        if (list.length > 0) {
          this.myHouseModelList = list;
          this.selectedRows = [+this.sectionId];//this.myHouseModelList.filter(x => x.SectionId === +this.sectionId).map(employee => employee.SectionId);      
          this.myhouseService.selectedSectionId.next(this.sectionId);
          this.setSectionText.emit(this.myHouseModelList.find(x => x.SectionId === this.sectionId).SectionName);
        }
      }));
    }));
  }

  ngOnInit() {
    this.subscriptions.push(this.myhouseService.myhouseList.subscribe(list => {
      if (list.length > 0) {
        this.myHouseModelList = list;
        this.selectedRows = [+this.sectionId];// this.myHouseModelList.filter(x => x.SectionId === +this.sectionId).map(employee => employee.SectionId);    
        this.setSectionText.emit(this.myHouseModelList.find(x => x.SectionId === this.sectionId).SectionName);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public getSectionSelection() {
    if (this.myHouseModelList.length > 0) {
      let currentSection = this.myHouseModelList.find(x => x.SectionId === +this.sectionId);
      // this.myHouseGrid.instance.selectRows([1],true);  
      this.selectedRows = [+this.sectionId];
      // this.myHouseGrid.instance.selectRows([currentSection], false);

    }

  }

  public onCategorySelection(event: any) {
    let selectedItem: MyHouseModel = event.selectedRowsData[0];
    if (selectedItem) {
      this.setSectionText.emit(selectedItem.SectionName);
      this.myhouseService.selectedSectionId.next(selectedItem.SectionId);
    }
  }

}
