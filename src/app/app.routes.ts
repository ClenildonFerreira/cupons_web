import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CouponsListComponent } from './coupons-list/coupons-list.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'coupons', component: CouponsListComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
