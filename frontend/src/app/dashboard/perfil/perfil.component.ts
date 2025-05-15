import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Necesario para *ngIf, @for, etc.
import { AuthService } from '../../auth.service';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export type Usuario = {
  id: number,
  nombre: string,
  apellidos: string,
  edad: number,
  email: string,
  proposito: string,
  perfil: string,
  entrenador: string
};

export type Usuarios = {
  id: number,
  nombre: string,
  apellidos: string,
  edad: number,
  email: string,
  proposito: string,
};

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuario: Usuario[] = [];
  usuarios: Usuarios[] = [];
  id = localStorage.getItem('id');
  perfil = localStorage.getItem('perfil');

  private authService = inject(AuthService);
  private router = inject(Router);
  private service = inject(PerfilService);

  ngOnInit(): void {
    this.service.getPerfil(this.id!).subscribe(data => {
      this.usuario = data;
    });

    this.getUsuarios();
  }

  //Aqui llamamos a los usuarios que el entrenador tiene a cargo 
  getUsuarios(){
  this.service.getUsuarios(this.id!).subscribe(data => {
    this.usuarios = data;
    console.log(this.usuarios);
  });
}


  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  

  eliminarCuenta() {
    //Deberia de haber una comprobacion de que si todavia tiene gente a cargo no pueda eliminar la cuenta, 
    // ademas de ponerle un mensaje de aviso --> "Tienes personas a cargo, no puedes eliminar la cuenta"
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar cuenta"
    });
  }
}
