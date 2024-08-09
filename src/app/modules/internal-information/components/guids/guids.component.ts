import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, WritableSignal, inject, signal } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import { GuidModel, Subtopics } from '../../../../core/models/guid.model';
import { NewTopicComponent } from '../new-topic/new-topic.component';
import { NewSubtopicComponent } from '../new-subtopic/new-subtopic.component';
import { ToastrService } from 'ngx-toastr';
import { AlterRuleSubtopicComponent } from '../alter-rule-subtopic/alter-rule-subtopic.component';

@Component({
  selector: 'app-guids',
  standalone: true,
  imports: [CommonModule, NewTopicComponent, NewSubtopicComponent, AlterRuleSubtopicComponent],
  templateUrl: './guids.component.html',
  styleUrl: './guids.component.scss'
})
export class GuidsComponent {
  public allGuids: GuidModel[] = [];
  public isCollapsed: { [guidId: number]: boolean[] } = {};

  public openModal: boolean = false;
  public openModalSubtopic: boolean = false;
  public openModalConfirm: boolean = false;
  public openModalConfirmSub: boolean = false;
  public openModalAlterRuleSubtopic: boolean = false;

  protected topicId:WritableSignal<number> = signal<number>(0);
  protected subTopic:WritableSignal<Subtopics> = signal<Subtopics>(new Subtopics());

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _toast: ToastrService) { }
  #internalService = inject(InternalService);

  ngOnInit(): void {
    this.#internalService.getAllGuide().result$.subscribe((res: any) => {
      this.allGuids = res?.data?.data as GuidModel[];
      this.allGuids?.forEach((guid: GuidModel) => {
        this.isCollapsed[guid.id] = guid.subTopics.map(() => false);
      });
    });
  }

  public OpenModalSubtopic(id: number) {
    this.openModalSubtopic = true;
    this.topicId.set(id);
    this.subTopic.set(new Subtopics);
  }

  public openModalDelete(id: number) {
    this.openModalConfirm = true;
    this.topicId.set(id);
  }

  public openModalDeleteSub(id: number) {
    this.openModalConfirmSub = true;
    this.topicId.set(id);
  }

  public deleteTopic(id: number) {
    this.#internalService.deleteTopic(id).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Tópico deletado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao deletar tópico!');
      }
    });
    this.openModalConfirm = false;
  }

  public deleteSubTopic(id: number) {
    this.#internalService.deleteSubTopic(id).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Tópico deletado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao deletar tópico!');
      }
    });
    this.openModalConfirmSub = false;
  }

  public editSubTopic(subTopic: Subtopics) {
    this.openModalSubtopic = true;
    this.subTopic.set(subTopic);
  }

  openModalAlterRule(subTopic: Subtopics) {
    this.openModalAlterRuleSubtopic = true;
    this.subTopic.set(subTopic);
  }
}
