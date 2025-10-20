import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom, map } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtToken } from '../shared/models/jwt-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userApiURL = environment.userApiURL;
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Promise<boolean> {
    return firstValueFrom(this.http.post<{ valid: boolean }>(`${this.userApiURL}/auth/validate-token`, { token, appName: 'ptreport' })
      .pipe(
        map(x => x.valid)
      ));
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }
  clearToken() {
    localStorage.removeItem('authToken');
  }

  getUser(): JwtToken | null {
        const token = this.getToken(); // ← อย่าลืม `()` ที่ท้ายฟังก์ชัน
        if (!token) {
            return null;
        }
    // return jwt_decode(token);
     return jwt_decode<JwtToken>(token);
}
}
