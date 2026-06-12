import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  wifeName = 'Meu Amor';
  daysTogether = 0;
  startDate = new Date('2023-06-12');

  constructor(private router: Router) {}

  ngOnInit() {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - this.startDate.getTime());
    this.daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  openCoupons() {
    this.router.navigate(['/coupons']);
  }
}
