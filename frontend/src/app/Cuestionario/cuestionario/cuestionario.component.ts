import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from "../../../components/input/input";
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from "../../../components/select/select";
import Swal from 'sweetalert2';
import { RegisterService } from '../../registro/registro.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cuestionario',
  imports: [RouterModule, InputComponent, NgClass, SelectComponent, FormsModule],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {

  userId = localStorage.getItem('userId');

  cuestionario = {
    codigo: 0,
    genero: '',
    objetivo: '',
    nivel: '',
    diasSeleccionados: [] as string[],
    frecuencia: 0,
    material: '',
    observaciones: ''
  };
  diasSemana = [
    { nombre: 'Lunes', inicial: 'L' },
    { nombre: 'Martes', inicial: 'M' },
    { nombre: 'Miércoles', inicial: 'M' },
    { nombre: 'Jueves', inicial: 'J' },
    { nombre: 'Viernes', inicial: 'V' },
    { nombre: 'Sábado', inicial: 'S' },
    { nombre: 'Domingo', inicial: 'D' }
  ];

  private service = inject(RegisterService);
  private router = inject(Router);
  private authService = inject(AuthService);

  toggleDia(dia: string) {
    const index = this.cuestionario.diasSeleccionados.indexOf(dia);
    if (index > -1) {
      this.cuestionario.diasSeleccionados.splice(index, 1);
    } else {
      this.cuestionario.diasSeleccionados.push(dia);
    }
  }

  camposVacios(): boolean {
    if (this.cuestionario.codigo === 0 || this.cuestionario.codigo === null) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El codigo no puede estar vacio", draggable: true });
      return false;
    } else if (this.cuestionario.genero.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes de seleccionar un género", draggable: true });
      return false;
    } else if (this.cuestionario.objetivo.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El propósito no puede estar vacio", draggable: true });
      return false;
    } else if (this.cuestionario.nivel.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes de seleccionar un nivel", draggable: true });
      return false;
    } else if (this.cuestionario.frecuencia === null) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes de escribir la frecuencia diaria", draggable: true });
      return false;
    } else if (this.cuestionario.diasSeleccionados.length === 0) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes seleccionar al menos un día", draggable: true });
      return false;
    } else if (this.cuestionario.material.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes debes de hacer una selección de material", draggable: true });
      return false;
    } else {
      return true;
    }
  }


  validarRegistro() {
    const camposValidos = this.camposVacios();
    if (camposValidos) {
      this.service.postCuestionario(this.userId!, this.cuestionario).subscribe({
        next: (res) => {
          localStorage.setItem('perfil', res.token);
          this.authService.getLoggedUser(); // Vuelve a decodificar el token y guarda el nuevo perfil
          this.router.navigate(['/dashboard/home']);
        }, error: (err) => {
          Swal.fire({
            title: "Error en el registro",
            icon: "error",
            text: "Hubo un problema al rellenar el formulario. Por favor, inténtelo de nuevo",
          });
          console.error('Error:', err);
        }

      });
    }

  }
}
