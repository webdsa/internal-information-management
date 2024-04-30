import { Component, EventEmitter, Output } from '@angular/core';
import { NavComponent } from '../../../shared/side-nav/side-nav.component';
import { CardComponent } from '../../../shared/card/card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { layoutMenu } from '../../../core/models/layoutMenu.model';
import { SearchComponent } from "../../../shared/search/search.component";
import { FilterComponent } from "../../../shared/filter/filter.component";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { PropertyModel } from '../../../core/models/property.model';
import { PatrimonyService } from '../services/patrimony.services';
import { ResponseModel } from '../../../core/models/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss',
  imports: [CommonModule, NavComponent, CardComponent, SearchComponent, FilterComponent, ModalComponent,HttpClientModule],
})
export class PropertyComponent {

  public property: Array<PropertyModel> = [];
  public propertyBkp: Array<PropertyModel> = [];
  public filteredProperties: Array<PropertyModel> = [];

  public modalOpen: boolean = false;

  types: string[] = [];
  status: string[] = [];

  selectedType: string = "Todos";

  response: any;

  @Output() result: EventEmitter<number> = new EventEmitter();

  constructor(private _patrimonyService: PatrimonyService, private router: Router) { }
  ngOnInit() {
    this.getProperty();
  }

  getProperty() {
    this._patrimonyService.getProperty().subscribe((response: ResponseModel<Array<PropertyModel>>) => {
      this.property = response.data!;
      this.propertyBkp = response.data!;
      this.filteredProperties = response.data!;
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
      this.filteredProperties = this.propertyBkp?.filter((x) => this.noAccents(x.propertyName.toUpperCase()).includes(search) || this.noAccents(x.status.toUpperCase()).includes(search));

    } else this.filteredProperties = this.property;
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  filterProperty(event: any) {
    if (event.type === "Todos" && event.status === "Todos") this.filteredProperties = this.propertyBkp;
    else if (event.type === "Todos") {
      this.filteredProperties = this.propertyBkp.filter(property => property.status === event.status);
    } else {
      this.filteredProperties = this.propertyBkp.filter(property => property.propertyType === event.type && property.status === event.status);
    }
  }

  addNew(){
    this.router.navigate(['/patrimony/new-property']);
  }
}
