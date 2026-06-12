import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  isAuthenticated = false;
  adminPassword = '';
  showError = false;

  coupons: any[] = [];
  isLoading = false;

  constructor(private router: Router, private http: HttpClient) {}

  private get baseUrl() {
    return window.location.port === '4200' ? `http://${window.location.hostname}:8080` : '';
  }

  ngOnInit() {
    if (localStorage.getItem('admin_authenticated') === 'true') {
      this.isAuthenticated = true;
      this.loadCoupons();
    }
  }

  checkPassword() {
    if (this.adminPassword === 'chefe') {
      this.isAuthenticated = true;
      localStorage.setItem('admin_authenticated', 'true');
      this.loadCoupons();
    } else {
      this.showError = true;
      setTimeout(() => this.showError = false, 3000);
    }
  }

  async loadCoupons() {
    try {
      this.isLoading = true;
      const headers = new HttpHeaders().set('X-Auth-Token', 'chefe');
      const response = await lastValueFrom(this.http.get<any[]>(`${this.baseUrl}/api/coupons`, { headers }));
      this.coupons = response;
    } catch (error) {
      console.error('Servidor offline:', error);
      // Se não tem back, avisa
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('admin_authenticated');
    this.isAuthenticated = false;
  }
}
