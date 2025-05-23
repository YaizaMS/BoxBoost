import { formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EjerciciosService } from '../ejercicios.service';

export type UserEjercicioCliente = {
  user_id: number,
  nombre: string,
  descripcion: string,
  musculo_principal: string,
  fecha: Date,
  series: number,
  repeticiones: number,
  peso: number,
  tiempo?: number,
  notas?: string,
  video_url: string
}

@Component({
  selector: 'app-vista-cliente',
  imports: [FormsModule],
  templateUrl: './vista-cliente.component.html',
  styleUrl: './vista-cliente.component.css'
})
export class VistaClienteComponent implements OnInit {

  clienteEjercicios: UserEjercicioCliente[] = [];

  perfil = localStorage.getItem('perfil');
  cliente = Number(localStorage.getItem('id'));

  selectDate: string;

  private service = inject(EjerciciosService);

  constructor() {
    const hoy = new Date();
    this.selectDate = formatDate(hoy, 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.getEjercicios();
  }

  onDateChange(nuevaFecha: string) {
    nuevaFecha = this.selectDate
    this.getEjercicios();
  }

  getEjercicios() {
    this.service.getClienteEjerciciosCliente(this.cliente, this.selectDate).subscribe((data) => {
      this.clienteEjercicios = data;
    });
  }
}
