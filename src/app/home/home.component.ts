import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  wifeName = 'Docinho de Coco';
  
  years = 0;
  months = 0;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  
  startDate = new Date('2023-08-09T21:30:11');
  private timer: any;

  // Custom Audio Player
  isMusicPlaying = false;
  audio = new Audio('/taylor.mp3');

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(e => console.error("Auto-play prevented", e));
    }
    this.isMusicPlaying = !this.isMusicPlaying;
  }

  currentTime = new Date();

  ngOnInit() {
    this.updateCounter();
    this.timer = setInterval(() => {
      this.currentTime = new Date();
      this.updateCounter();
      this.cdr.detectChanges(); // Força a tela a atualizar os segundos!
    }, 1000);

    // Configurar áudio para repetir eternamente
    this.audio.loop = true;
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateCounter() {
    const now = this.currentTime;
    let y = now.getFullYear() - this.startDate.getFullYear();
    let m = now.getMonth() - this.startDate.getMonth();
    let d = now.getDate() - this.startDate.getDate();
    let h = now.getHours() - this.startDate.getHours();
    let min = now.getMinutes() - this.startDate.getMinutes();
    let s = now.getSeconds() - this.startDate.getSeconds();

    if (s < 0) { s += 60; min--; }
    if (min < 0) { min += 60; h--; }
    if (h < 0) { h += 24; d--; }
    if (d < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      d += prevMonth.getDate();
      m--;
    }
    if (m < 0) { m += 12; y--; }

    this.years = y;
    this.months = m;
    this.days = d;
    this.hours = h;
    this.minutes = min;
    this.seconds = s;
  }

  openCoupons() {
    this.router.navigate(['/coupons']);
  }
}
