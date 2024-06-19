import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import { GuidModel, Subtopics } from '../../../../core/models/guid.model';
import { NewTopicComponent } from '../new-topic/new-topic.component';
import { NewSubtopicComponent } from '../new-subtopic/new-subtopic.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guids',
  standalone: true,
  imports: [CommonModule, NewTopicComponent, NewSubtopicComponent],
  templateUrl: './guids.component.html',
  styleUrl: './guids.component.scss'
})
export class GuidsComponent {
  public allGuids: GuidModel[] = [];
  public isCollapsed: { [guidId: number]: boolean[] } = {};

  public openModal: boolean = false;
  public openModalSubtopic: boolean = false;

  public topicId: number = 0;
  public subTopicId: number = 0;

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
    this.topicId = id;
  }

  public deleteTopic(id: number) {
    this.#internalService.deleteTopic(id).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Tópico deletado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao deletar tópico!');
      }
    });
  }

  public deleteSubTopic(id: number) {
    this.#internalService.deleteSubTopic(id).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Tópico deletado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao deletar tópico!');
      }
    });
  }

  public editSubTopic(id: number) {
    this.openModalSubtopic = true;
    this.subTopicId = id;
  }
}
