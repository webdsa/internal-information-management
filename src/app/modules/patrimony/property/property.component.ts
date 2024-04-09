import { Component, EventEmitter, Output } from '@angular/core';
import { NavComponent } from '../../../shared/side-nav/side-nav.component';
import { CardComponent } from '../../../shared/card/card.component';
import { HttpClient } from '@angular/common/http';
import { layoutMenu } from '../../../core/models/layoutMenu.model';
import { SearchComponent } from "../../../shared/search/search.component";
import { FilterComponent } from "../../../shared/filter/filter.component";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { PropertyModel } from '../../../core/models/property.model';

@Component({
    selector: 'app-property',
    standalone: true,
    templateUrl: './property.component.html',
    styleUrl: './property.component.scss',
    imports: [CommonModule, NavComponent, CardComponent, SearchComponent, FilterComponent, ModalComponent],
})
export class PropertyComponent {

  public property:PropertyModel[] = [];
  public modalOpen: boolean = false;

  response: any;

  @Output() result: EventEmitter<number> = new EventEmitter();

  constructor(private _httpClient: HttpClient) {   }
  ngOnInit() {

    this._httpClient.get<PropertyModel[]>('assets/mock/property.json').subscribe(data => {
      this.property = data;
    });
  }

  onclickOpenModal() {
    this.modalOpen = true;
  }

  onclickCloseModal(event: any) {
    this.modalOpen = false;
    if (event.response == 0) return;
    this.result.emit(1);
  }
}
