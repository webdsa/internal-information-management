import { Component, EventEmitter, Input, Output, WritableSignal, inject, signal } from '@angular/core';
import { Subtopics } from '../../../../core/models/guid.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternalService } from '../../services/internal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alter-rule-subtopic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alter-rule-subtopic.component.html',
  styleUrl: './alter-rule-subtopic.component.scss'
})
export class AlterRuleSubtopicComponent {
  protected form: WritableSignal<TravelerProfile> = signal<TravelerProfile>( new TravelerProfile());

  @Input() public subtopic: Subtopics = new Subtopics();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  #InternalService = inject(InternalService);
  constructor(private _toast: ToastrService) { }

  public AlterRuleSubTopic() {
    this.#InternalService.alterRuleSubTopic(this.form()).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this.onClose.emit(true);
        this._toast.success('Regra alterada com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao alterar regra!');
      }
    });
  }

  selectGender(target:any){
    this.form().genderType = target.value;
  }
}
export class TravelerProfile {
  topicId!: number;
  subTopicId!: number;
  ageMax: number | undefined;
  ageMin: number | undefined;
  exacliAge: number | undefined;
  genderType: string | undefined;
  exaclyFunction: string[] | undefined;
  excludeFunction: string[] | undefined;
  departure: string[] | undefined;
}
