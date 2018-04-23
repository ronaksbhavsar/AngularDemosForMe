import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { DxTabPanelComponent } from 'devextreme-angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild("tabPanel") tabPanel: DxTabPanelComponent;
  private subscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params
      .subscribe(param => this.tabPanel.selectedIndex = +param["viewId"] ? +param["viewId"] : 0));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
