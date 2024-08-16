import { Component, EventEmitter, Input, Output, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastrService } from 'ngx-toastr';

import { InternalService } from '../../services/internal.service';
import { Subtopics } from '../../../../core/models/guid.model';

@Component({
  selector: 'app-alter-rule-subtopic',
  standalone: true,
  imports: [CommonModule, FormsModule,MultiSelectModule,FloatLabelModule],
  templateUrl: './alter-rule-subtopic.component.html',
  styleUrl: './alter-rule-subtopic.component.scss'
})
export class AlterRuleSubtopicComponent {
  protected form: WritableSignal<TravelerProfile> = signal<TravelerProfile>(new TravelerProfile());

  @Input() public subtopic: Subtopics = new Subtopics();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected propertys: WritableSignal<string[]> = signal([]);
  #InternalService = inject(InternalService);
  constructor(private _toast: ToastrService) {}

  ngOnInit(): void {
    this.form().topicId = this.subtopic.topicId;
    console.log(this.subtopic.topicId,'woow')
    this.form().subTopicId = this.subtopic.id;
    this.getPropertys();
  }
  public AlterRuleSubTopic() {
    console.log(this.form());
    this.#InternalService
      .alterRuleSubTopic(this.form())
      .mutateAsync(null)
      .then((res: any) => {
        if (res.isSucceed) {
          this.onClose.emit(true);
          this._toast.success('Regra alterada com sucesso!');
        } else {
          this._toast.error('Procure a equipe de suporte.', 'Erro ao alterar regra!');
        }
      });
  }

  selectEmployee(target: any) {
    this.form().isReligious = target.value;
  }

  getPropertys() {
    this.#InternalService.getPropertys().result$.subscribe((res: any) => {
      this.propertys.set(res.data?.data);
    });
  }
  selectProperty(target: any) {
    this.form().functionalPropertyName = target.value;
  }
  callMe(){
    console.log(this.form(),'like u');
  }
}
export class TravelerProfile {
  topicId!: number;
  subTopicId!: number;
  isReligious!: boolean;
  maxOrderOcupational!: number;
  minOrderOcupational!: number;
  functionalPropertyName!: string;
}
