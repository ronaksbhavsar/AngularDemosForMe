import { Component, OnInit } from '@angular/core';
import { Utilities } from '../../../../Utilities';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public currentyear = Utilities.getCurrentYear();
  constructor() { }

  ngOnInit() {    
  }

}
