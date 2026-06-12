import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  wifeName = 'Meu Amor';
  daysTogether = 0;
  startDate = new Date('2023-06-12'); // Example date, will be dynamic later

  ngOnInit() {
    this.calculateDaysTogether();
  }

  calculateDaysTogether() {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - this.startDate.getTime());
    this.daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  openCoupons() {
    console.log('Opening coupons...');
    // Navigation logic later
  }
}
