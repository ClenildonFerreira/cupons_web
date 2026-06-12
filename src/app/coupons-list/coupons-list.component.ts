import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-coupons-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupons-list.component.html'
})
export class CouponsListComponent implements OnInit {
  coupons: any[] = [];
  isLoading = true;

  selectedCoupon: any = null;
  showModal = false;
  showSuccess = false;

  meuNumeroWhatsapp = '5585986930095'; 

  constructor(
    private router: Router, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  private get baseUrl() {
    // Se estiver rodando localmente no ng serve, usa o localhost.
    // Se estiver publicado no Frontend (Nuvem), aponta direto para a API da Hostinger!
    return window.location.port === '4200' ? `http://localhost:8080` : `http://187.77.200.244:8080`;
  }

  ngOnInit() {
    this.loadCoupons();
  }

  async loadCoupons() {
    try {
      this.isLoading = true;
      const headers = new HttpHeaders().set('X-Auth-Token', 'florzinha');
      const response = await lastValueFrom(this.http.get<any[]>(`${this.baseUrl}/api/coupons`, { headers }));
      
      if (!response || response.length === 0) {
        throw new Error('Banco de dados vazio.');
      }

      this.coupons = response.map(c => ({
        ...c,
        redeemed: c.status === 'REDEEMED'
      }));
    } catch (error) {
      console.warn('Erro ao carregar ou servidor vazio. Carregando dados offline...');
      this.loadFallbackCoupons();
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Força a tela a atualizar imediatamente!
    }
  }

  loadFallbackCoupons() {
    this.coupons = [
      { id: '1', title: 'Vale Jantar Especial', desc: 'Um jantar romântico no seu lugar favorito.', icon: 'pi pi-star-fill', redeemed: false },
      { id: '2', title: 'Vale Cinema a Dois', desc: 'Filme, pipoca e abraços no sofá ou no cinema.', icon: 'pi pi-video', redeemed: false },
      { id: '3', title: 'Vale Massagem', desc: '30 minutos de massagem relaxante.', icon: 'pi pi-heart', redeemed: false },
      { id: '4', title: 'Passeio Surpresa', desc: 'Deixe-me planejar uma tarde inesquecível.', icon: 'pi pi-compass', redeemed: false },
      { id: '5', title: 'Sobremesa Favorita', desc: 'Seu doce favorito entregue na hora.', icon: 'pi pi-gift', redeemed: false },
      { id: '6', title: '100 Beijos', desc: 'Resgate para receber muito carinho.', icon: 'pi pi-heart-fill', redeemed: false },
      { id: '7', title: 'Abraço Ilimitado', desc: 'Válido para qualquer momento do dia.', icon: 'pi pi-users', redeemed: false },
      { id: '8', title: 'Dia de Rainha', desc: 'Eu faço as tarefas, você relaxa.', icon: 'pi pi-crown', redeemed: false },
      { id: '9', title: 'Viagem Futura', desc: 'Nossa próxima grande aventura.', icon: 'pi pi-map', redeemed: false }
    ];
    
    const saved = localStorage.getItem('cupons_gastos');
    if (saved) {
      const redeemedIds = JSON.parse(saved);
      this.coupons.forEach(c => {
        if (redeemedIds.includes(c.id)) {
          c.redeemed = true;
        }
      });
    }
  }

  saveStateFallback() {
    const redeemedIds = this.coupons.filter(c => c.redeemed).map(c => c.id);
    localStorage.setItem('cupons_gastos', JSON.stringify(redeemedIds));
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  openRedeemModal(coupon: any) {
    if (coupon.redeemed) return;
    this.selectedCoupon = coupon;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCoupon = null;
  }

  async confirmRedeem() {
    if (this.selectedCoupon) {
      try {
        const headers = new HttpHeaders().set('X-Auth-Token', 'florzinha');
        await lastValueFrom(this.http.put(`${this.baseUrl}/api/coupons/${this.selectedCoupon.id}/redeem`, {}, { headers }));
      } catch (error) {
        console.warn('Servidor offline. Salvando apenas localmente.');
      }
      
      this.selectedCoupon.redeemed = true;
      this.saveStateFallback(); 
      
      this.showModal = false;
      this.showSuccess = true;
      
      // Força a tela a apagar o Modal e exibir a tela de sucesso imediatamente!
      this.cdr.detectChanges();
      
      // Montando a mensagem mandona
      const mensagem = `Amor! 🚨 Acabei de usar meu bilhete VIP: *${this.selectedCoupon.title}*.\n\nA ordem é clara: ${this.selectedCoupon.desc}\n\nTrate de cumprir rapidinho, tá? Sua rainha mandou! 👑❤️`;
      
      // Codificando a mensagem para formato de URL do WhatsApp
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${this.meuNumeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
      
      // Abre o WhatsApp imediatamente no dispositivo dela
      window.open(whatsappUrl, '_blank');

      // Esconde a tela de sucesso após 3.5 segundos
      setTimeout(() => {
        this.showSuccess = false;
        this.selectedCoupon = null;
        this.cdr.detectChanges(); // Força a atualização após o tempo acabar
      }, 3500);
    }
  }
}
