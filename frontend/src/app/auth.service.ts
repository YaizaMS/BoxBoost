import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  usuario: string;
  pass: string;
  email: string;
  edad: number;
  nombre: string;
  apellidos: string;
  perfil: number;
  proposito: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:3000/api';

  private userIdSubject = new BehaviorSubject<number | null>(this.getUserIdFromStorage());
  userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(usuario: { user: string; pass: string }) {
    return this.http.post<{ token: string }>(`${this.api}/login/`, usuario).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.decodeAndStoreToken(res.token);
      })
    );
  }

  updateUserProfile(perfil: number) {
  localStorage.setItem('perfil', perfil.toString());

  const currentId = this.getCurrentUserId();
  if (currentId !== null) {
    this.userIdSubject.next(currentId); 
  }
}


  private decodeAndStoreToken(token: string) {
    const decoded = jwtDecode<TokenPayload>(token);
    const { id, nombre, perfil } = decoded;

    localStorage.setItem('id', id.toString());
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('perfil', perfil.toString());

    this.userIdSubject.next(id); 
  }

  getLoggedUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeAndStoreToken(token);
    }
  }

  logout() {
    localStorage.clear();
    this.userIdSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserIdFromStorage(): number | null {
    const id = localStorage.getItem('id');
    return id ? Number(id) : null;
  }

  getCurrentUserId(): number | null {
    return this.userIdSubject.value;
  }


}
