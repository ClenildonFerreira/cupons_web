import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('is_authenticated');
  
  if (isAuthenticated === 'true') {
    return true;
  }
  
  router.navigate(['/']);
  return false;
};
