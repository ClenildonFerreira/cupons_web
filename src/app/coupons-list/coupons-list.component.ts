import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupons-list.component.html'
})
export class CouponsListComponent {
  coupons = [
    { title: 'Vale Jantar Especial', desc: 'Um jantar romântico no seu lugar favorito.', icon: 'pi pi-star-fill' },
    { title: 'Vale Cinema a Dois', desc: 'Filme, pipoca e abraços no sofá ou no cinema.', icon: 'pi pi-video' },
    { title: 'Vale Massagem', desc: '30 minutos de massagem relaxante.', icon: 'pi pi-heart' },
    { title: 'Passeio Surpresa', desc: 'Deixe-me planejar uma tarde inesquecível.', icon: 'pi pi-compass' },
    { title: 'Sobremesa Favorita', desc: 'Seu doce favorito entregue na hora.', icon: 'pi pi-gift' },
    { title: '100 Beijos', desc: 'Resgate para receber muito carinho.', icon: 'pi pi-heart-fill' },
    { title: 'Abraço Ilimitado', desc: 'Válido para qualquer momento do dia.', icon: 'pi pi-users' },
    { title: 'Dia de Rainha', desc: 'Eu faço as tarefas, você relaxa.', icon: 'pi pi-crown' },
    { title: 'Viagem Futura', desc: 'Nossa próxima grande aventura.', icon: 'pi pi-map' }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
}
