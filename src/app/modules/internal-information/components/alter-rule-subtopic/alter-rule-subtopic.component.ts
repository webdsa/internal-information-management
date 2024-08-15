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
  protected form: WritableSignal<TravelerProfile> = signal<TravelerProfile>(new TravelerProfile());

  @Input() public subtopic: Subtopics = new Subtopics();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected propertys: string[] = [];
  #InternalService = inject(InternalService);
  constructor(private _toast: ToastrService) {}

  ngOnInit(): void {
    this.propertys = this.getPropertys();
  }
  public AlterRuleSubTopic() {
    console.log(this.form());
    // this.#InternalService.alterRuleSubTopic(this.form()).mutateAsync(null).then((res: any) => {
    //   if (res.isSucceed) {
    //     this.onClose.emit(true);
    //     this._toast.success('Regra alterada com sucesso!');
    //   } else {
    //     this._toast.error('Procure a equipe de suporte.', 'Erro ao alterar regra!');
    //   }
    // });
  }

  selectEmployee(target: any) {
    this.form().isReligious = target.value;
  }

  getPropertys() {
    let propertys: any[] = [];
    this.#InternalService.getPropertys().result$.subscribe((res: any) => {
      propertys = res.data?.data;
    });
    console.log(propertys, 'senhor');
    return propertys ?? [];
  }
  selectProperty(target: any) {
    this.form().functionalPropertyName = target.value;
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
