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
  // proposito: string,
  // perfil: string,
  // entrenador: string
};

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuarios: Usuario[] = [];
  id = localStorage.getItem('id');

  private authService = inject(AuthService);
  private router = inject(Router);
  private service = inject(PerfilService);

  ngOnInit(): void {
    this.service.getPerfil(this.id!).subscribe(data => {
      this.usuarios = [data];
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  eliminarCuenta() {
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
