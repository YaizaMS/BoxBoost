import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, Usuarios } from './perfil.component';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  getPerfilEntrenador(id: string) {return this.http.get<Usuario[]>(`${this.api}/perfil/entrenador/${id}`)};
  getPerfilCliente(id: string) {return this.http.get<Usuario[]>(`${this.api}/perfil/cliente/${id}`)};


  getUsuarios(id: string) {return this.http.get<Usuarios[]>(`${this.api}/perfil/usuarios/${id}`)}
}
