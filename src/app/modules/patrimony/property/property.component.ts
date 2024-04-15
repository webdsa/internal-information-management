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
  public propertyBkp: PropertyModel[] = [];
  public modalOpen: boolean = false;
  public filteredProperties :PropertyModel[] = [];
  types: string[] = [];
  status: string[] = [];

  selectedType: string = "Todos";

  response: any;

  @Output() result: EventEmitter<number> = new EventEmitter();

  constructor(private _httpClient: HttpClient) {   }
  ngOnInit() {
    this.getProperty();
  }

  getProperty(){
    this._httpClient.get<PropertyModel[]>('assets/mock/property.json').subscribe(data => {
      this.property = data;
      this.propertyBkp = data;
      this.filteredProperties = data
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

  onTypeSelected(type: string) {
    if (type === "Todos") {
      this.filteredProperties = this.property;
    } else {
      this.filteredProperties = this.property.filter(property => property.type === type);
    }
  }

  onStatusSelected(status: string) {
      this.filteredProperties = this.property.filter(property => property.status === status);
  }

  searchByName(search: string) {
    if (search != '' && search != undefined) {
        this.property = this.filteredProperties?.filter(
            (x: PropertyModel) => search == '' || this.noAccents(x.edifice.toUpperCase()).includes(search) || x.items.find((item) => item.proprietary.trim().toString().includes(search.trim()))
        );
    } else this.property = this.filteredProperties;
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
