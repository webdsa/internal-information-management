import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import { GuidModel } from '../../../../core/models/guid.model';

@Component({
  selector: 'app-guids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guids.component.html',
  styleUrl: './guids.component.scss'
})
export class GuidsComponent {
  public allGuids: GuidModel[] = [];
  #internalService = inject(InternalService);
  ngOnInit(): void {
    this.#internalService.getAllGuide().result$.subscribe((res: any) => {
      this.allGuids = res?.data?.data as GuidModel[];
    });
  }
}
