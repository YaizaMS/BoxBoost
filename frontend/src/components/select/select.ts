import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `
    <div class="my-2">
      <label class="font-exo" [for]="id">{{label}}</label>
      <br>
      <select
        class="bg-secondary text-primary rounded-full p-1 pl-2 w-full"
        [id]="id"
        [value]="value"
        (change)="onSelect($event)">
        @for (opt of options; track $index) {
        <option [value]="opt.value">{{opt.label}}</option>
        }
      </select>
    </div>
  `,
  styleUrls: ['./select.css']
})
export class SelectComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() options: { value: string, label: string }[] = [];
  @Input() value: any = '';

  @Output() valueChange = new EventEmitter<any>();

  onSelect(event: Event) {
    const selectValue = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(selectValue);
  }
}
