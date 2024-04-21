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

  public property: PropertyModel[] = [];
  public propertyBkp: PropertyModel[] = [];
  public modalOpen: boolean = false;
  public filteredProperties: PropertyModel[] = [];
  types: string[] = [];
  status: string[] = [];

  selectedType: string = "Todos";

  response: any;

  @Output() result: EventEmitter<number> = new EventEmitter();

  constructor(private _httpClient: HttpClient) { }
  ngOnInit() {
    this.getProperty();
  }

  getProperty() {
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

  searchByName(search: string) {
    if (search != '' && search != undefined) {
      search = this.noAccents(search);
      this.filteredProperties = this.propertyBkp?.filter((x) => this.noAccents(x.edifice.toUpperCase()).includes(search) || this.noAccents(x.status.toUpperCase()).includes(search));

    } else this.filteredProperties = this.property;
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  filterProperty(event: any) {
    if (event.type === "Todos" && event.status === "Todos")this.filteredProperties = this.propertyBkp;
      else if (event.type === "Todos") {
      this.filteredProperties = this.propertyBkp.filter(property => property.status === event.status);
    }else{
      this.filteredProperties = this.propertyBkp.filter(property => property.type === event.type && property.status === event.status);
    } 
  }
}
