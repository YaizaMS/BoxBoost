import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SeleccionService } from './seleccion.service';

@Component({
  selector: 'app-seleccion',
  imports: [RouterModule],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  codigo = '';

  private service = Inject(SeleccionService);
  private router = Inject(Router);

  crearGrupo() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = Math.floor(Math.random() * 5) + 6; // entre 6 y 10
    let codigo = '';

    for (let i = 0; i < longitud; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[randomIndex];
    }
    console.log(codigo);

    return codigo;
  }

  unirseGrupo() {
    this.router.navigate(['/cuestionario']);
  }

}
