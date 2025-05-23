import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selector-ejercicios',
  imports: [FormsModule],
  templateUrl: './selector-ejercicios.component.html',
  styleUrl: './selector-ejercicios.component.css'
})
export class SelectorEjerciciosComponent {
  @Input() ejercicios: any[] = [];
  @Output() onSelect = new EventEmitter<any>();

  filtro = '';

  get ejerciciosFiltrados() {
  const f = this.filtro.toLowerCase();
  return this.ejercicios.filter(
    (e) => e.nombre.toLowerCase().includes(f) || e.musculo_principal.toLowerCase().includes(f) || e.dificultad.toLowerCase().includes(f)
  );
}


  seleccionar(ejercicio: any) {
    this.onSelect.emit(ejercicio);
  }
}
