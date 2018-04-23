import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { dashboardRouting } from './dashboard.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DevExtremeModule, DxSwitchModule } from 'devextreme-angular';
import { DashboardService } from '../../services/dashboard.service';
import { HeaderComponent } from '../../containers/layout/components/header/header.component';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { MaintenanceChecklistComponent } from './dashboard/maintenance-checklist/maintenance-checklist.component';
import { HomePicturesComponent } from './home-pictures/home-pictures.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './home-pictures/gallery/gallery.component';
import { DesignComponent } from './design/design.component';
import { DesignService } from '../../services/design.service';
import { DesignSubcategoriesComponent } from './design-subcategories/design-subcategories.component';
import { CategoriesListComponent } from './design-subcategories/categories-list/categories-list.component';
import { SubcategoriesGridComponent } from './design-subcategories/subcategories-grid/subcategories-grid.component';

import { AnnoucementsComponent } from './messages/annoucements/annoucements.component';
import { MessagesService } from '../../services/messages.service';
import { MessageComponent } from './messages/message/message.component';
import { DashboardMessageComponent } from './dashboard/message/message.component';

import { MessagesComponent } from './messages/messages.component';
import { ServiceAndMaintenanceComponent } from './service-and-maintenance/service-and-maintenance.component';
import { ServiceRequestComponent } from './service-and-maintenance/service-request/service-request.component';
import { ServiceRequestService } from '../../services/service-request.service';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PossessionComponent } from './portfolio/possession/possession.component';
import { MyhomeComponent } from './portfolio/myhome/myhome.component';
import { CommunityComponent } from './portfolio/community/community.component';
import { PortfolioService } from '../../services/portfolio.service';
import { AreainfoService } from '../../services/areainfo.service';
import { SheduleService } from '../../services/shedule.service';
import { ProfileService } from '../../services/profile.service';



import { ShareModule } from '@ngx-share/core';
//  import { AgmCoreModule } from '@agm/core';
import { AreainfoComponent } from './areainfo/areainfo.component';
import { AddEditServiceRequestWorkorderComponent } from './service-and-maintenance/service-request/add-edit-service-request/add-edit-service-request-workorder/add-edit-service-request-workorder.component';

import { AddEditServiceRequestComponent } from './service-and-maintenance/service-request/add-edit-service-request/add-edit-service-request.component';
import { SchedulesComponent } from './schedule/schedules/schedules.component';
import { MilestoneComponent } from './schedule/milestone/milestone.component';
import { LightboxModule } from 'angular2-lightbox';
import { DashboardAnnouncementComponent } from './dashboard/announcement/announcement.component';


import { DashboardAppointmentsComponent } from '../dashboard/dashboard/appointments/appointments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ToastrModule, ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { CustomNotification } from '../../CustomNotification';
import { MyHouseComponent } from './my-house/my-house.component';
import { MyhouseService } from '../../services/myhouse.service';
import { MyHouseDetailsComponent } from './my-house/my-house-details/my-house-details.component';
import { MyhouseListComponent } from './my-house/my-house-details/myhouse-list/myhouse-list.component';
import { MyhouseGridComponent } from './my-house/my-house-details/myhouse-grid/myhouse-grid.component';
import { ColorsheetComponent } from './colorsheet/colorsheet.component';
import { Title } from '@angular/platform-browser';
import { BlockCutCopyPasteDirective } from '../../Directives/block-cut-copy-paste.Directive';
import { AllowNumbers } from '../../Directives/allow-numbers.Directive';
import { CompareColorsheetsComponent } from './design-subcategories/compare-colorsheets/compare-colorsheets.component';
import { NoWhitespaceDirective } from '../../Directives/no-whitespace.directive';
import { MaintenanceComponent } from './service-and-maintenance/maintenance/maintenance.component';
import { UploadListComponent } from './buyer-upload-section/modules/upload-list/upload-list.component';
import { BuyerUploadService } from './buyer-upload-section/services/buyer-upload.service';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { NgUploaderModule } from 'ngx-uploader';
import { AddEditUploadComponent } from './buyer-upload-section/modules/upload-list/add-edit-upload/add-edit-upload.component';
import { RestrictSpecialCharactersDirective } from '../../Directives/restrict-special-characters.Directive';
import { RestrictHtmlTagsDirective } from '../../Directives/restrict-html-tags.Directive';
import { FixBrokenImageDirective } from '../../Directives/fix-broken-image.Directive';
@NgModule({
  imports: [
    NgxCarouselModule,
    dashboardRouting,
    CommonModule,
    DevExtremeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,      // (Required) for share counts    
    ShareModule.forRoot(),
    DxSwitchModule,
    LightboxModule,
    NgUploaderModule,
    //BrowserAnimationsModule, // required animations module    
  ],
  declarations: [
    DashboardComponent,
    ScheduleComponent,
    DocumentsComponent,
    MaintenanceChecklistComponent,
    HomePicturesComponent,
    ContactComponent,
    GalleryComponent,
    DesignComponent,
    DesignSubcategoriesComponent,
    CategoriesListComponent,
    SubcategoriesGridComponent,
    AnnoucementsComponent,
    MessageComponent,
    MessagesComponent,
    ServiceAndMaintenanceComponent,
    ServiceRequestComponent,
    AddEditServiceRequestComponent,
    ProfileComponent,
    PortfolioComponent,
    PossessionComponent,
    MyhomeComponent,
    CommunityComponent,
    AreainfoComponent,
    AddEditServiceRequestWorkorderComponent,
    SchedulesComponent,
    MilestoneComponent,
    DashboardAnnouncementComponent,
    DashboardMessageComponent,
    DashboardAppointmentsComponent,
    MyHouseComponent,
    MyHouseDetailsComponent,
    MyhouseListComponent,
    MyhouseGridComponent,
    ColorsheetComponent,
    BlockCutCopyPasteDirective,
    AllowNumbers,
    CompareColorsheetsComponent,
    NoWhitespaceDirective,
    MaintenanceComponent,
    UploadListComponent,
    AddEditUploadComponent,
    RestrictSpecialCharactersDirective,
    RestrictHtmlTagsDirective,
    FixBrokenImageDirective
  ],
  providers: [
    DashboardService,
    DesignService,
    MessagesService,
    ServiceRequestService,
    PortfolioService,
    AreainfoService,
    SheduleService,
    ProfileService,
    CustomNotification,
    MyhouseService,
    Title,
    BuyerUploadService
  ]
})
export class DashboardModule { }
