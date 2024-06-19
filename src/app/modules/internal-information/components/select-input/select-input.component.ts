import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();
  #internalService = inject(InternalService);

  public allGuids: any = [];
  public title: string = "Selecione ou crie o Tópico";
  public showItens: boolean = false;

  ngOnInit(): void {
    this.#internalService.getAllGuide().result$.subscribe((res: any) => {
      this.allGuids = res?.data?.data as any[];
    });
  }

  selectedItem(event: any) {
    const response = [event.target.value, event.target.options[event.target.selectedIndex].text];
    console.log(response);
    this.onChanged.emit(response);
  }
}
