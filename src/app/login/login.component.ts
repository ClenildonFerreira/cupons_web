import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  passphrase = '';
  showError = false;
  showHint = false;
  isSuccess = false;

  constructor(private router: Router) {
    if (localStorage.getItem('is_authenticated') === 'true') {
      this.router.navigate(['/home']);
    }
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }

  checkPassphrase() {
    // Se a animação de sucesso já estiver rodando, não deixa clicar de novo
    if (this.isSuccess) return;

    const secret = this.passphrase.toLowerCase().trim();
    if (secret === 'florzinha') {
      this.isSuccess = true;
      this.showError = false;
      localStorage.setItem('is_authenticated', 'true');
      
      // Delay de 1.5s para ela ver o botão confirmando o acesso
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
      
    } else {
      this.showError = true;
      setTimeout(() => this.showError = false, 3500);
    }
  }
}
