import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { DocumentModel } from '../../../../models/DocumentModel';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dashboard-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  public documentDetails: DocumentModel[] = [];
  private subscriptions: Subscription[] = [];
  constructor(public dashboardService: DashboardService
    , public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.dashboardService.getCommunityDocumentByCommunityLotId(lotId).subscribe(x => {
          this.documentDetails = x ? x.paperlessfile : [];
        }));
      }
    }));
  }

  public onItemClick(data) {
    window.open(data.itemData.FileAccessUrl, '_blank');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
