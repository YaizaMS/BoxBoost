import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';

export type usuario = {
  id: number,
  nombre: string,
  apellidos: string,
  email: string,
  edad: number,
  perfil: string,
  proposito: string,
  //entrenador: string
}

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private service  = inject(PerfilService)

  ngOnInit(): void {
    
  }


  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
