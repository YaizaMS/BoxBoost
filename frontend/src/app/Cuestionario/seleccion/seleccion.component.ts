import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SeleccionService } from './seleccion.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-seleccion',
  imports: [RouterModule],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  codigo = '';

  userid = localStorage.getItem('userId');


  constructor(private service: SeleccionService, private router: Router) { }

  async crearGrupo() {
    const result = await Swal.fire({
      title: "Agrega tu código personal",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Hecho",
      showLoaderOnConfirm: true,
      preConfirm: async (codigo) => {
        try {
          this.service.guardarCodigo(codigo, this.userid!).subscribe({
            next: () => console.log('Código guardado'),
            error: (err) => console.error('Error:', err)
          });
          return true;
        } catch (error) {
          Swal.showValidationMessage("Ese código ya existe. Por favor, ingresa otro.");
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "¡Su código es válido!",
        icon: "success",
        text: "Con él podrás invitar a tu equipo para entrenar",
        confirmButtonText: "Continuar"
      });

      this.router.navigate(['/dashboard/home']);
    }
  }

  unirseGrupo() {
    this.router.navigate(['/cuestionario']);
  }

}
