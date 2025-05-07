import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  registrar = 
  ( registro: {nombre: string, apellidos: string, email: string, edad: Date | null}, usuario: { user: string, pass: string}) => {
    const body = { ...registro, ...usuario };
    return this.http.post<{token: string}>(`${this.api}/registro/`, body );
  }

  validarUsuario = (user:string) => {return this.http.get(`${this.api}/registro/${user}`);}
}
