import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ContactComponent } from './contact/contact.component';
import { HomePicturesComponent } from './home-pictures/home-pictures.component';
import { MessagesComponent } from './messages/messages.component';
import { DesignComponent } from './design/design.component';
import { DesignSubcategoriesComponent } from './design-subcategories/design-subcategories.component';
import { ServiceAndMaintenanceComponent } from './service-and-maintenance/service-and-maintenance.component';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AreainfoComponent } from './areainfo/areainfo.component';
import { AddEditServiceRequestComponent } from './service-and-maintenance/service-request/add-edit-service-request/add-edit-service-request.component';
import { AddEditServiceRequestWorkorderComponent } from './service-and-maintenance/service-request/add-edit-service-request/add-edit-service-request-workorder/add-edit-service-request-workorder.component';
import { MyHouseComponent } from '../dashboard/my-house/my-house.component';
import { MyHouseDetailsComponent } from '../dashboard/my-house/my-house-details/my-house-details.component'
import { ColorsheetComponent } from './colorsheet/colorsheet.component';
import { CompareColorsheetsComponent } from './design-subcategories/compare-colorsheets/compare-colorsheets.component';
import { LoginComponent } from '../../modules/non-auth/login/login.component';
import { UploadListComponent } from './buyer-upload-section/modules/upload-list/upload-list.component';
import { AddEditUploadComponent } from './buyer-upload-section/modules/upload-list/add-edit-upload/add-edit-upload.component';
const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard | Park Square Homes' } },
    { path: 'schedule', component: ScheduleComponent, data: { title: 'Shedule | Park Square Homes' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact | Park Square Homes' } },
    { path: 'homepictures', component: HomePicturesComponent, data: { title: 'Home Pictures | Park Square Homes' } },
    { path: 'homepictures/:Id', component: HomePicturesComponent, data: { title: 'Home Pictures | Park Square Homes' } },
    { path: 'design', component: ColorsheetComponent, data: { title: 'Design | Park Square Homes' } },
    { path: 'design/CompareColorsheets', component: CompareColorsheetsComponent, data: { title: 'Compare Colorsheets | Park Square Homes' } },
    { path: 'design/:buyerWishListChangeOrderId', component: DesignComponent, data: { title: 'Design | Park Square Homes' } },
    { path: 'design/designSubCategories/:sectionId/buyerWishListChangeOrderId/:buyerWishListChangeOrderId', component: DesignSubcategoriesComponent, data: { title: 'Design | Park Square Homes' } },
    { path: 'messages/:viewId', component: MessagesComponent, data: { title: 'Message | Park Square Homes' } },
    { path: 'ServicesMaintenance/:viewId/ServiceRequest', component: ServiceAndMaintenanceComponent, data: { title: 'Service Request | Park Square Homes' } },
    { path: 'ServicesMaintenance/ServiceRequest/:serviceRequestId', component: AddEditServiceRequestComponent, data: { title: 'Service Request | Park Square Homes' } },
    { path: 'ServicesMaintenance/ServiceRequest/:serviceRequestId/ServiceRequestWorkorder/:serviceRequestWorkorderId', component: AddEditServiceRequestWorkorderComponent, data: { title: 'Service Request | Park Square Homes' } },
    { path: 'areainfo', component: AreainfoComponent, data: { title: 'Area Info | Park Square Homes' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile | Park Square Homes' } },
    { path: 'portfolio', component: PortfolioComponent, data: { title: 'Documents | Park Square Homes' } },
    { path: 'myhouse', component: MyHouseComponent, data: { title: 'My House | Park Square Homes' } },
    { path: "myhouse/myhousedetails", redirectTo: "myhouse", component: MyHouseDetailsComponent, data: { title: 'My House | Park Square Homes' } },
    { path: 'myhouse/myhousedetails/:sectionId', component: MyHouseDetailsComponent, data: { title: 'My House | Park Square Homes' } },
    { path: 'buyerUpload', component: UploadListComponent, data: { title: 'Upload List | Park Square Homes' } },
    { path: 'buyerUpload/:taskId', component: AddEditUploadComponent, data: { title: 'Buyer Upload | Park Square Homes' } },
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(routes);
