import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from './home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  getClientes(idEntrenador: number) {
    return this.http.get<Clientes[]>(`${this.api}/home/${idEntrenador}`);
  }

}
