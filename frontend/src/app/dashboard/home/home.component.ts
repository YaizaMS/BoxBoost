import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth.service';
import { DatePipe, formatDate, NgClass } from '@angular/common';
import { HomeService } from './home.service';
import { EjerciciosService } from '../ejercicios/ejercicios.service';

export type Notificaciones = {
  id: number,
  persona: string,
  titulo: string,
  fecha: Date,
  mensaje: string
}

export type Ejercicios = {
  id: number,
  fecha: Date,
  hora: Date,
  titulo: string,
  descripcion: string,  
  estado: boolean
}

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
  dia: string
}

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
  selector: 'app-home',
  imports: [NgClass, DatePipe, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  perfil = localStorage.getItem('perfil');
  id = Number(localStorage.getItem('id'));;
  nombreUsuario = localStorage.getItem('nombre');

  clientes: Clientes[] = [];

  clienteEjercicios: UserEjercicioCliente[] = [];
  selectDate: string;

  constructor() {
    const hoy = new Date();
    this.selectDate = formatDate(hoy, 'yyyy-MM-dd', 'en');
  }
  
  
  //Variables calendario
  notificaciones: Notificaciones[] = [];
  ejercicios: Ejercicios[] = [];
  hoy = '';
  year = 0;
  fecha = new Date();
  day = new Date().getDate();
  mes = new Date().getMonth() + 1;
  meses = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ];
  diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  nombreMes = this.meses[this.mes - 1]
  dias: { fecha?: Date}[] = [];
  
  diaSemana= this.diasSemana[this.fecha.getDay()-1]; // Saca el nombre del dia de la semana

  

  private auth = inject(AuthService);
  private service = inject(HomeService);
  private service2 = inject(EjerciciosService);

  ngOnInit(): void {
    this.service.getClientes(this.id!).subscribe( (data) => {
      this.clientes = data;
    });

    this.auth.getLoggedUser(); //Obtiene el nombre del usuario logueado

    const indiceHoy = new Date().getDay();
    this.hoy = this.diasSemana[(indiceHoy + 6 ) % 7];

    this.hoy = new Date().toISOString().substring(0, 10);
    this.year = +this.hoy.substring(0, 4);
    this.generarDiasMes();

    this.getClienteEjerciciosCliente(this.id!);

  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const moth = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${moth}-${day}`;
  }

  anteriorMes() {
    if (this.mes === 1) {
      this.mes = 12;
      this.year--;
    } else {
      this.mes--;
    }
    this.actualizarMes();
  }

  siguienteMes() {
    if (this.mes === 12) {
      this.mes = 1;
      this.year++;
    } else {
      this.mes++;
    }
    this.actualizarMes();
  }

  private actualizarMes() {
    this.nombreMes = this.meses[this.mes - 1];
    this.generarDiasMes();
    //this.cargarDatos();
  }

  generarDiasMes() {
    const primerDia = new Date(this.year, this.mes - 1, 1).getDay();
    const ultimoDia = new Date(this.year, this.mes, 0).getDate();

    const primerDiaIndex = primerDia === 0 ? 6 : primerDia - 1;
    this.dias = [];

    this.dias = Array(primerDiaIndex).fill({ fecha: null, ejecicios: [] });

    for (let i = 1; i <= ultimoDia; i++) {
      const fecha = new Date(this.year, this.mes - 1, i);
      this.dias.push({ fecha });
    }

  }


  comparoDia(fecha: Date | null) {
    if(fecha  === null) {
      return false;
    }
    return this.day === fecha.getDate() && this.mes === fecha.getMonth() + 1;
  }
  
  getClienteEjerciciosCliente(idCliente: number) {
    this.service2.getClienteEjerciciosCliente(idCliente, this.selectDate).subscribe((data) => {
      this.clienteEjercicios = data;
    });
  }


}
