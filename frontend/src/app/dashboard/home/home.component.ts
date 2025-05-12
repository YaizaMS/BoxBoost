import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth.service';
import { DatePipe, NgClass } from '@angular/common';
import { HomeService } from './home.service';

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
  email: string,
  perfil: number,
  proposito: string,
  entrenador: string,
}


@Component({
  selector: 'app-home',
  imports: [NgClass, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  perfil = localStorage.getItem('perfil');
  entrenador = Number(localStorage.getItem('id'));;
  nombreUsuario = localStorage.getItem('nombre');

  clientes: Clientes[] = [];


  //Variables calendario
  notificaciones: Notificaciones[] = [];
  ejercicios: Ejercicios[] = [];
  hoy = '';
  year = 0;
  day = new Date().getDate();
  mes = new Date().getMonth() + 1;
  meses = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ];
  diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  nombreMes = this.meses[this.mes - 1]
  dias: { fecha?: Date}[] = [];


  

  private auth = inject(AuthService);
  private service = inject(HomeService);

  ngOnInit(): void {
    this.service.getClientes(this.entrenador!).subscribe( (data) => {
      this.clientes = data;
    });

    this.auth.getLoggedUser(); //Obtiene el nombre del usuario logueado

    this.hoy = new Date().toISOString().substring(0, 10);
    this.year = +this.hoy.substring(0, 4);
    this.generarDiasMes();

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
  //Codigo entrenador 
  diasEntrenador(idCliente: number) {
  }

}
