import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
  public exaclyFunction: string = '';
  public excludeFunction: string = '';
  public departure: string = '';
  public genderType: string = '';
  public ageMax: number = 0;
  public ageMin: number = 0;
  public exacliAge: number = 0;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  @Input() public subtopic: Subtopics = new Subtopics();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  #InternalService = inject(InternalService);
  constructor(private _toast: ToastrService) { }

  public AlterRuleSubTopic() {
    const rule = {
      "topicId": this.subtopic.topicId ?? 0,
      "subTopicId": this.subtopic.id ?? 0,
      "exaclyFunction": this.exaclyFunction ?? null,
      "excludeFunction": this.excludeFunction ?? null,
      "departure": this.departure ?? null,
      "genderType": this.genderType ?? null,
      "ageMax": this.ageMax ?? null,
      "ageMin": this.ageMin ?? null,
      "exacliAge": this.exacliAge ?? null
    };
    this.#InternalService.alterRuleSubTopic(rule).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this.onClose.emit(true);
        this._toast.success('Regra alterada com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao alterar regra!');
      }
    });
  }
}
