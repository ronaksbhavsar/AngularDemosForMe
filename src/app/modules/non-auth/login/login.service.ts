import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../../shared/services/auth.service';
import { Login, ForgotPasswordModel, ResetTokenRequestModel, ResetPasswordRequestModel } from '../../../models/login';
import { ApiResponseModel } from '../../../models/ApiResponseModel';
import { HttpClientService } from '../../../lib/http/http-client.service';
import { IHttpOptions } from '../../../shared/interfaces/http-interface';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor(public authService: AuthService, public http: HttpClientService) {
  }

  login(loginModel: Login) {
    return this.http.post('/Account/Login', loginModel);
  }

  forgotPassword(forgotPassword: ForgotPasswordModel) {
    return this.http.post('/Account/ForgotPasswordRequest', forgotPassword);
  }

  resetPassword(resetPassword: ResetPasswordRequestModel) {
    return this.http.post('/Account/ResetPassword', resetPassword);
  }

  verifyPasswordResetCode(resetTokenModel: ResetTokenRequestModel) {
    return this.http.post('/Account/VerifyPasswordResetCode', resetTokenModel);
  }
}
