import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonAuthRouting } from './non-auth.routing';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { NonAuthService } from './non-auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EqualValidatorDirective } from '../../Directives/equal-validator.Directive';

@NgModule({
  imports: [
    CommonModule,
    NonAuthRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EqualValidatorDirective
  ],
  providers: [
    LoginService,
    NonAuthService
  ]
})
export class NonAuthModule { }
