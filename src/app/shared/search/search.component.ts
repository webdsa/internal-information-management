import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() Disabled!: boolean;
  @Input() placeholder: string = 'Digite para pesquisar';
  @Input() background!: number;
  @Input() typeStyle!: number;

  @Output() result: EventEmitter<any> = new EventEmitter();

  searchDataItem(event: any) {
    const inputValue: string | null = (event.target as HTMLInputElement).value;
    const string: string = inputValue ? inputValue : ''; // Define como uma string vazia se for null ou undefined
    this.result.emit(string.toUpperCase());
  }
}
