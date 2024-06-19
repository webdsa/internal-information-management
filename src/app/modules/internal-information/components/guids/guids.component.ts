import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import { GuidModel, Subtopics } from '../../../../core/models/guid.model';
import { NewTopicComponent } from '../new-topic/new-topic.component';

@Component({
  selector: 'app-guids',
  standalone: true,
  imports: [CommonModule, NewTopicComponent],
  templateUrl: './guids.component.html',
  styleUrl: './guids.component.scss'
})
export class GuidsComponent {
  public allGuids: GuidModel[] = [];
  public isCollapsed: boolean[] = [];
  public openModal: boolean = false;
  public openModalSubtopic: boolean = false;

  #internalService = inject(InternalService);

  ngOnInit(): void {
    this.#internalService.getAllGuide().result$.subscribe((res: any) => {
      this.allGuids = res?.data?.data as GuidModel[];
      this.allGuids?.forEach((guid: GuidModel) => {
        this.isCollapsed = guid.subTopics.map(() => false)
      });
    });
  }
}
