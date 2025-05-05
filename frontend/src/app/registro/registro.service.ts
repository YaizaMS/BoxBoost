import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  registrar = ( registro: {nombre: string, apellidos: string, email: string, edad: Date | null}) => {
    return this.http.post(`${this.api}/registro/`, registro );}

  validarUsuario = (user:string) => {return this.http.get(`${this.api}/registro/${user}`);}
}
