import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../../services/portfolio.service';
import { SubscriptionService } from '../../../../app/shared/services/subscription.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  PossessionList:any[]=[];
  HomeList:any[]=[];
  CommunityList:any[]=[];
  constructor(public portfolioService:PortfolioService,public subscriptionService:SubscriptionService) { }

  ngOnInit() {
    //
    
  }

  

}
