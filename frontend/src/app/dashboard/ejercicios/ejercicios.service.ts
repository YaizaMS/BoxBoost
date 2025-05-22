import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes, Select, Ejercicios, UserEjercicio } from './ejercicios.component';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEjercicios() {
    return this.http.get<Ejercicios[]>(`${this.api}/ejercicios/ejercicio`);
  }

  getInfoCliente(idEntrenador: number, idCliente: number) {
    return this.http.get<Clientes[]>(`${this.api}/ejercicios/info/${idEntrenador}/${idCliente}`);
  }

  getClientes2(idEntrenador: number) {
    return this.http.get<Select[]>(`${this.api}/ejercicios/select/${idEntrenador}`);
  }

  getEjerciciosCliente(idUser: number, fecha: string) {
    return this.http.get<UserEjercicio[]>(`${this.api}/ejercicios/usuarioEjercicios/${idUser}/${fecha}`);
  }

  guardarEjercicio( user_id: number, fecha: string,
    ejercicio: { ejercicio_id: number, series: number, repeticiones: number, peso: number, tiempo?: number, notas?: string }) {
    return this.http.post<UserEjercicio[]>(`${this.api}/ejercicios/guardarEjercicio/${user_id}/${fecha}`, ejercicio);
  }
  
  eliminarEjercicio(id: number) {
    return this.http.delete<UserEjercicio[]>(`${this.api}/ejercicios/eliminarEjercicio/${id}`);
  }

}
