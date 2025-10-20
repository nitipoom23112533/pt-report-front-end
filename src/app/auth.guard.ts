import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {environment} from '../environments/environment.development'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const token = authService.getToken(); // ✅ ดึง token จาก localStorage

  const opportalURL = environment.opportalURL;
  if (!token) {
    router.navigate(['/login']); // ✅ ถ้าไม่มี token ให้กลับไปหน้า login
    window.location.href = opportalURL;
    return false;
  }
  
  return true; // ✅ ถ้ามี token ให้เข้าหน้าเว็บ
};
