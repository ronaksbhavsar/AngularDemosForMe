import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth.service';



@Injectable()
export class SkipLoginGuard implements CanActivate {

  constructor(public router: Router, public authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    if (token) {
      return false;
    } else {
      return true;
    }
  }
}
