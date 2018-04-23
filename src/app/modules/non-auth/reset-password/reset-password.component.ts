import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomNotification } from '../../../CustomNotification';
import { Utilities } from '../../../Utilities';
import { ResetTokenRequestModel, ResetPasswordModel, ResetPasswordRequestModel } from '../../../models/login';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private paramId: string;
  model: ResetPasswordModel = new ResetPasswordModel();
  private subscriptions: Subscription[] = [];
  constructor(public router: Router,
    private customNotification: CustomNotification,
    private loginService: LoginService,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(param => this.paramId = param["passwordResetCode"]));
    if (this.paramId) {
      let model = new ResetTokenRequestModel();
      model.UniqueKey = this.paramId;
      this.subscriptions.push(this.loginService.verifyPasswordResetCode(model).subscribe(x => {
        if (!x.Status) {
          this.invalidAccess(x.Message);
        }
      }));
    } else {
      this.invalidAccess('Something went wrong. please try again later.');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  invalidAccess(message: string) {
    this.customNotification.notify(message, "", Utilities.warning);
    this.router.navigate(['/login']);
  }

  resetPassword() {
    let resetPasswordRequestModel = new ResetPasswordRequestModel();
    resetPasswordRequestModel.Password = this.model.password;
    resetPasswordRequestModel.UniqueKey = this.paramId;
    this.subscriptions.push(this.loginService.resetPassword(resetPasswordRequestModel).subscribe(x => {
      this.customNotification.notify(x.Message, '', x.Status ? Utilities.success : Utilities.error);
      this.router.navigate(['/login']);
    }));
  }

}
