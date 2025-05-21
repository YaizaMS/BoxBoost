import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  guardarCodigo(codigo: string, userId: string) {
    return this.http.get(`${this.api}/seleccion/${codigo}/${userId}`);
  }
}
