import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  id: number;
  usuario: string;
  pass: string;
  email: string;
  edad: number;
  nombre: string;
  apellidos: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  login(usuario: { user: string; pass: string }) {
    return this.http.post<{ token: string }>(`${this.api}/login/`, usuario).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getLoggedUser() {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      const id = decoded.id;
      const nombre = decoded.nombre;
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('id', id.toString());

    }
    
  }
}
