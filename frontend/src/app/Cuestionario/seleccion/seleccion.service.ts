import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private api = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  comportamiento(codigo: string) {
    return this.http.get<string>(`${this.api}/seleccion/${codigo}`);
  }
}
