import { Component, EventEmitter, Input, InputSignal, Output, WritableSignal, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastrService } from 'ngx-toastr';

import { InternalService } from '../../services/internal.service';
import { Rules, Subtopics } from '../../../../core/models/guid.model';

@Component({
  selector: 'app-alter-rule-subtopic',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectModule, FloatLabelModule],
  templateUrl: './alter-rule-subtopic.component.html',
  styleUrl: './alter-rule-subtopic.component.scss'
})
export class AlterRuleSubtopicComponent {
  protected form: WritableSignal<Rules> = signal<Rules>(new Rules());

  public subtopic: InputSignal<Subtopics> = input(new Subtopics());
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected propertys: WritableSignal<string[]> = signal([]);
  #InternalService = inject(InternalService);
  constructor(private _toast: ToastrService) {}

  ngOnInit(): void {
    this.form.set(this.subtopic().rules);
    this.form().topicId = this.subtopic().topicId;
    this.form().subTopicId = this.subtopic().id;
    this.getPropertys();
  }
  public AlterRuleSubTopic() {
    this.#InternalService
      .alterRuleSubTopic(this.form())
      .mutateAsync(null)
      .then((res: any) => {
        if (res.succeeded) {
          this.onClose.emit(true);
          this._toast.success('Regra alterada com sucesso!');
        } else {
          this._toast.error('Procure a equipe de suporte.', 'Erro ao alterar regra!');
        }
      });
  }

  selectEmployee(target: any) {
    this.form().isReligious = target.value === 'true' ? true : target.value === 'false' ? false : null;
  }

  getPropertys() {
    this.#InternalService.getPropertys().result$.subscribe((res: any) => {
      this.propertys.set(res.data?.data);
    });
  }
  
  selectProperty(target: any) {
    this.form().functionalPropertyName = target.value;
  }

  convertToNull(field: 'minOrderOcupational' | 'maxOrderOcupational', value: any) {
    this.form()[field] = value === '' ? null : value;
  }
  
}
