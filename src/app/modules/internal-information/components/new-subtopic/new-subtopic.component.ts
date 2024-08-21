import { Component, EventEmitter, Input, InputSignal, Output, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InternalService } from '../../services/internal.service';
import { Subtopics } from '../../../../core/models/guid.model';
import { EditorChangeContent, EditorChangeSelection, QuillModule } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'app-new-subtopic',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './new-subtopic.component.html',
  styleUrl: './new-subtopic.component.scss'
})
export class NewSubtopicComponent {
  public topicId: InputSignal<number> = input<number>(0);
  public subtopic: InputSignal<Subtopics> = input<Subtopics>(new Subtopics());
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public titleSuTtopic: string = '';
  public subTopicDescription: string = '';
  public subTopicContent: string = '';

  constructor(private _toast: ToastrService) {}

  #InternalService = inject(InternalService);

  ngOnInit(): void {
    if (this.subtopic().id) {
      this.titleSuTtopic = this.subtopic().name ?? '';
      this.subTopicDescription = this.subtopic().description ?? '';
      this.subTopicContent = this.subtopic().content ?? '';
    }
  }

  public createSubTopic() {
    const subtopic = {
      id: this.subtopic().id ?? 0,
      name: this.titleSuTtopic,
      isActive: true,
      description: this.subTopicDescription,
      topicId: this.topicId(),
      content: this.subTopicContent
    };
    if (this.subtopic().id) {
      this.#InternalService
        .alterSubTopic(subtopic)
        .mutateAsync(null)
        .then((res: any) => {
          if (res.succeeded) {
            this.onClose.emit(true);
            this._toast.success('Tópico alterado com sucesso!');
          } else {
            this._toast.error('Procure a equipe de suporte.', 'Erro ao criar tópico!');
          }
        });
    } else {
      this.#InternalService
        .createSubTopic(subtopic)
        .mutateAsync(null)
        .then((res: any) => {
          if (res.succeeded) {
            this.onClose.emit(true);
            this._toast.success('Tópico criado com sucesso!');
          } else {
            this._toast.error('Procure a equipe de suporte.', 'Erro ao criar tópico!');
          }
        });
    }
  }

  created(event: Quill | any) {
    // tslint:disable-next-line:no-console
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection | any) {
    // tslint:disable-next-line:no-console
  }
}
