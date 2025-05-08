import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div class="my-2 ">
      <label class="font-exo" [for]="id">{{label}}</label>
      <br>
      <input class="bg-secondary text-primary rounded-full p-1 pl-2 w-full"
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
        (keyup.enter)="onInput($event)"
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
  @Input() value: any = ''; //cualquier tipo de dato para poder adaptarlo a cualquier tipo de input

  @Output() valueChange = new EventEmitter<any>();

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue);
    //console.log(inputValue); 
  }
}