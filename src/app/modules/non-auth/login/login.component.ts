import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from '../../../models/login';
import { AuthService } from '../../../shared/services/auth.service';
import { BuyerModel } from '../../../models/BuyerModel';
import { CommonService } from '../../../shared/services/common.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  model: Login = new Login();
  error: string;
  isLoading: boolean;
  returnUrl: string;
  private subscriptions: Subscription[] = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router, public loginService: LoginService,
    public authService: AuthService, public commonService: CommonService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  onForgotPassword() {
    this.router.navigate(["/forgotpassword/"]);
  }

  login() {
    this.isLoading = true;
    this.subscriptions.push(this.loginService.login(this.model).subscribe(res => {
      this.commonService.setAuthUser(res.buyer);
      this.authService.setAuhToken(res.auth_token);
      this.isLoading = false;
      if (res) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.error = 'Incorrect username/password';
      }
    }, err => {
      this.isLoading = false;
      this.error = (err) ? err.error.Message : "Incorrect username/password";
    }));
  }
}
