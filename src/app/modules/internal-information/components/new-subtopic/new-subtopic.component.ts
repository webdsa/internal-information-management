import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GuidModel, Subtopics } from '../../../../core/models/guid.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InternalService } from '../../services/internal.service';

@Component({
  selector: 'app-new-subtopic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-subtopic.component.html',
  styleUrl: './new-subtopic.component.scss'
})
export class NewSubtopicComponent {
  @Input() public topicId!: number;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public titleSuTtopic: string = '';
  public subTopicDescription: string = '';


  constructor(private _toast: ToastrService) { }

  #InternalService = inject(InternalService);

  public createSubTopic() {
    const topic = {
      "id": 0,
      "name": this.titleSuTtopic,
      "isActive": true,
      "description": '',
      "topicId": this.topicId,
      "content": this.subTopicDescription
    };
    this.#InternalService.createSubTopic(topic).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this.onClose.emit(true);
        this._toast.success('Tópico criado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao criar tópico!');
      }
    });
  }

  public selectId(event: any) {
    this.topicId = event.value;
  }
}
