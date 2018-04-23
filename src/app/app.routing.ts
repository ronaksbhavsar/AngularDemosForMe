import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkipLoginGuard } from './guards/skip-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlankLayoutComponent } from './containers/blank-layout/blank-layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [SkipLoginGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/non-auth/non-auth.module#NonAuthModule'
      }
    ]
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
