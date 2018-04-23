import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth.service';
import { CommonService } from '../shared/services/common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public authService: AuthService,
    public commonService: CommonService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    if (token) {
      if (!this.commonService.AuthUser.getValue()) {
        this.commonService.getCurrentBuyerDetails().subscribe(x => {
          this.commonService.AuthUser.next(x);
        });
      }
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
