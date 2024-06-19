import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternalService } from '../../services/internal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-topic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-topic.component.html',
  styleUrl: './new-topic.component.scss'
})
export class NewTopicComponent {
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _toast: ToastrService) { }

  #InternalService = inject(InternalService);
  public topic: string = '';

  public createTopic() {
    const topic = {
      "id": 0,
      "name": this.topic,
      "isActive": true
    };
    this.#InternalService.createTopic(topic).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this.onClose.emit(true);
        this._toast.success('Tópico criado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao criar tópico!');
      }
    });
  }
}
