import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DxTabPanelComponent } from 'devextreme-angular';

@Component({
  selector: 'app-service-and-maintenance',
  templateUrl: './service-and-maintenance.component.html',
  styleUrls: ['../messages/messages.component.css']
})
export class ServiceAndMaintenanceComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @ViewChild("tabPanel") tabPanel: DxTabPanelComponent;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params
      .subscribe(param => this.tabPanel.selectedIndex = +param["viewId"] ? +param["viewId"] : 0));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }


}
