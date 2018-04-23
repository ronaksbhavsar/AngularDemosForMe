import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonService } from '../../../shared/services/common.service';
import { ForgotPasswordModel } from '../../../models/login';
import { CustomNotification } from '../../../CustomNotification';
import { Utilities } from '../../../Utilities';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  model: ForgotPasswordModel = new ForgotPasswordModel();
  error: string;
  isLoading: boolean;
  private subscriptions: Subscription[] = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public loginService: LoginService,
    private customNotification: CustomNotification,
    public authService: AuthService,
    public commonService: CommonService) {
  }


  ngOnInit() {
  }

  onBackToLoginClick() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  forgotPassword() {
    this.subscriptions.push(this.loginService.forgotPassword(this.model).subscribe(x => {
      this.customNotification.notify(x.Message,
        '', x.Status ? Utilities.success : Utilities.error);
      this.onBackToLoginClick();
    }));
  }

}
