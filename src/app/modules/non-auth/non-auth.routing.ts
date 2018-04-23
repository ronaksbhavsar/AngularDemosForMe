import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
    {
        path: '', component: null,
        children: [
            { path: 'login', component: LoginComponent, data: { title: 'Login | Park Square Homes' } },
            { path: 'forgotpassword', component: ForgotPasswordComponent, data: { title: 'Forgot Password | Park Square Homes' } },
            { path: 'resetpassword/:passwordResetCode', component: ResetPasswordComponent, data: { title: 'Reset Password | Park Square Homes' } },
        ]
    },

];

export const NonAuthRouting: ModuleWithProviders = RouterModule.forChild(routes);
