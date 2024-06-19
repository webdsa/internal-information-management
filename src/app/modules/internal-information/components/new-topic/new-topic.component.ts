import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-topic',
  standalone: true,
  imports: [],
  templateUrl: './new-topic.component.html',
  styleUrl: './new-topic.component.scss'
})
export class NewTopicComponent {
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

}
