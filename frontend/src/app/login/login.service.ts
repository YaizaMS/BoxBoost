import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login = (usuario: { user: string; pass: string }) => {
    return this.http.post<{ token: string }>(`${this.api}/login/`, usuario)
  }
}
