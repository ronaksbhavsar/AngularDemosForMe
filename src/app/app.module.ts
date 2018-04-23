import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

// Component imports
import { AppComponent } from './app.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlankLayoutComponent } from './containers/blank-layout/blank-layout.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { CommonService } from './shared/services/common.service';
import { AuthService } from './shared/services/auth.service';
import { HttpClientService } from './lib/http/http-client.service';
import { ResponseInterceptor } from './lib/http/response-interceptor';
import { SkipLoginGuard } from './guards/skip-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './containers/layout/components/header/header.component';
import { FooterComponent } from './containers/layout/components/footer/footer.component';
import { LeftSideComponent } from './containers/layout/components/left-side/left-side.component';
import { ControlSidebarComponent } from './containers/layout/components/control-sidebar/control-sidebar.component';
import { DevExtremeModule, DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { SubscriptionService } from './shared/services/subscription.service';
import { NgHttpLoaderComponentsModule } from 'ng-http-loader/components/ng-http-loader-components.module';
import { NgHttpLoaderServicesModule } from 'ng-http-loader/services/ng-http-loader-services.module';

// share and google map
import { ShareModule } from '@ngx-share/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService, ToastNoAnimationModule, ToastNoAnimation } from 'ngx-toastr';
import { CustomNotification } from '../app/CustomNotification';
import { APP_BASE_HREF } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    BlankLayoutComponent,
    HeaderComponent,
    FooterComponent,
    LeftSideComponent,
    ControlSidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    HttpModule,
    routing,
    DevExtremeModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,
    NgHttpLoaderServicesModule,
    NgHttpLoaderComponentsModule,
    ToastNoAnimationModule,
    FormsModule,
    HttpClientModule,      // (Required) for share counts    
    ShareModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true,
      toastComponent: ToastNoAnimation,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      disableTimeOut: true,
    })
  ],
  providers: [
    CommonService,
    AuthService,
    SubscriptionService,
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    SkipLoginGuard,
    AuthGuard,
    CustomNotification,
    Title,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
