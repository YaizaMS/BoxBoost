import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputComponent } from "../../../components/input/input";
import { CommonModule, NgClass } from '@angular/common';
import { SelectComponent } from "../../../components/select/select";

@Component({
  selector: 'app-cuestionario',
  imports: [RouterModule, InputComponent, NgClass, CommonModule, SelectComponent],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {

  cuestionario = {
    codigo: '',
    genero: '',
    proposito: '',
    disponibilidad: '',
    material: ''
  }

  diasSemana = [
    { nombre: 'Lunes', inicial: 'L' },
    { nombre: 'Martes', inicial: 'M' },
    { nombre: 'Miércoles', inicial: 'M' },
    { nombre: 'Jueves', inicial: 'J' },
    { nombre: 'Viernes', inicial: 'V' },
    { nombre: 'Sábado', inicial: 'S' },
    { nombre: 'Domingo', inicial: 'D' }
  ];
  diasSeleccionados: string[] = [];

  toggleDia(dia: string) {
  const index = this.diasSeleccionados.indexOf(dia);
  if (index > -1) {
    this.diasSeleccionados.splice(index, 1);
  } else {
    this.diasSeleccionados.push(dia);
  }
}
}
