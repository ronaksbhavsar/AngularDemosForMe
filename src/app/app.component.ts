import { Component, ViewContainerRef, OnDestroy } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  public spinkit = Spinkit;
  title = 'app';
  private subscriptions: Subscription[] = [];
  constructor(titleService: Title, router: Router, activatedRoute: ActivatedRoute
    , public location: Location
    , private authService: AuthService) {
    this.subscriptions.push(router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          let title = this.getTitle(router.routerState, router.routerState.root).join('-');
          titleService.setTitle(title);
          return;
        }
        window.scrollTo(0, 0);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  getTitle(state, parent) {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}


