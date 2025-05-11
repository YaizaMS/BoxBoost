import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './perfil.component';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  getPerfil(id: string) {
    return this.http.get<Usuario>(`${this.api}/perfil/${id}`);

  }
}
