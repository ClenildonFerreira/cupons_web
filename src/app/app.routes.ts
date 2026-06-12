import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CouponsListComponent } from './coupons-list/coupons-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coupons', component: CouponsListComponent },
  { path: '**', redirectTo: '' }
];
