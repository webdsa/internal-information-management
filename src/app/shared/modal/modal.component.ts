import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() open: boolean = false;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() messageBtnYes!: string;
  @Input() messageBtnNo: string = '';

  @Output() result: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkChanges(changes, 'open')) {
      this.openModal();
    }
  }
  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.currentValue;
  }


  response(type: number) {
    this.open = false;
    this.result.emit(type);
  }

  openModal() {
    this.description = this.description;
    this.messageBtnYes = this.messageBtnYes;
    this.messageBtnNo = this.messageBtnNo;
    this.icon = this.icon;
  }

}
