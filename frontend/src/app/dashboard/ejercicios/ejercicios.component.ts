import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { EjerciciosService } from './ejercicios.service';
import { InputComponent } from "../../../components/input/input";
import { FormsModule, NgForm } from '@angular/forms';
import { SelectorEjerciciosComponent } from "./selector-ejercicios/selector-ejercicios.component";
import { DatePipe, formatDate, NgClass } from '@angular/common';
import { VistaClienteComponent } from "./vista-cliente/vista-cliente.component";

export type Clientes = {
  id: number,
  nombre: string,
  apellidos: string,
  edad: number,
  objetivo: string,
  nivel_fitness: string,
  disponibilidad: string,
  frecuencia: number,
  observaciones: string,
  genero: string,
  material: string,
}

export type Select = {
  id: number,
  nombre: string,
  apellidos: string
}

export type Ejercicios = {
  id: number,
  nombre: string,
  tipo: string,
  musculo_pricipal: string,
  dificultad: string,
}

export type UserEjercicio = {
  id: number,
  user_id: number,
  nombre: string,
  ejercicio_id: number,
  fecha: Date,
  series: number,
  repeticiones: number,
  peso: number,
  tiempo?: number,
  notas?: string
}

export type UserEjercicioInput = Omit<UserEjercicio, 'id' | 'nombre'>;


@Component({
  selector: 'app-ejercicios',
  imports: [FormsModule, SelectorEjerciciosComponent, DatePipe, InputComponent, NgClass, VistaClienteComponent],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})
export class EjerciciosComponent implements OnInit {

  clientes: Clientes[] = [];
  clientes2: Select[] = [];
  ejercicios: Ejercicios[] = [];
  userEjercicios: UserEjercicio[] = [];

  selectDate: string;
  mostrarSelector = false;
  clienteSeleccionado: number = 0;

  entrenador = Number(localStorage.getItem('id'));
  perfil = localStorage.getItem('perfil');

  ejercicioForm = {
    ejercicio_id: 0,
    series: 0,
    repeticiones: 0,
    peso: 0,
    tiempo: undefined,
    notas: ''
  };


  constructor() {
    const hoy = new Date();
    this.selectDate = formatDate(hoy, 'yyyy-MM-dd', 'en');
  }

  private service = inject(EjerciciosService);

  ngOnInit(): void {
    this.getEjercicios();
    this.selectCliente(this.entrenador!);
    this.infoCliente(this.entrenador!);
    this.getEjerciciosCliente(this.clienteSeleccionado);
  }

  onDateChange(nuevaFecha: string) {
    nuevaFecha = this.selectDate
    this.getEjerciciosCliente(this.clienteSeleccionado);
  }

  abrirSelectorEjercicio() {
    this.mostrarSelector = true;
  }
  cerrarSelector() {
    this.mostrarSelector = false;
  }

  agregarEjercicio(ejercicio: any) {
    this.mostrarSelector = false;

    this.userEjercicios.push(); //Añadir aqui el ejercicio seleccionado
  }

  selectCliente(idEntrenador: number) {
    this.service.getClientes2(idEntrenador).subscribe((data) => {
      this.clientes2 = data;
    });
  }

  infoCliente(id_cliente: number) {
    this.service.getInfoCliente(this.entrenador!, id_cliente).subscribe((data) => {
      this.clientes = data;
    });
  }

  getEjercicios() {
    this.service.getEjercicios().subscribe((data) => {
      this.ejercicios = data;
    });
  }

  getEjerciciosCliente(cliente_id: number) {
    this.service.getEjerciciosCliente(cliente_id, this.selectDate).subscribe((data) => {
      this.userEjercicios = data;
    });
  }

  guardarEjercicio() {
    this.service.guardarEjercicio(this.clienteSeleccionado, this.selectDate, this.ejercicioForm).subscribe({
      next: () => {
        this.getEjerciciosCliente(this.clienteSeleccionado);
        this.resetarFormulario();
      },
      error: (err) => {
        alert('Error al guardar el ejercicio');
        console.error('Error:', err);
      }
    });
  }

  resetarFormulario() {
    this.ejercicioForm = {
      ejercicio_id: 0,
      series: 0,
      repeticiones: 0,
      peso: 0,
      tiempo: undefined,
      notas: ''
    };
  }

 borrarEjercicio(id: number) {
  this.service.eliminarEjercicio(id).subscribe({
    next: () => {
      this.getEjerciciosCliente(this.clienteSeleccionado);
    },
    error: (err) => {
      alert('Error al borrar el ejercicio');
      console.error('Error:', err);
    }
  });
}
}
