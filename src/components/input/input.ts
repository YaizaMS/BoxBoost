import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div class="my-2">
      <label class="font-exo " [for]="id">{{label}}</label>
      <br>
      <input class="bg-secondary rounded-full p-1"
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
      />
    </div>
  `,
  styleUrls: ['./input.css']
})
export class InputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(inputValue); // Puedes emitir este valor si es necesario
  }
}