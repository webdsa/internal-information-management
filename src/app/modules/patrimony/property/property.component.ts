import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from "../../../shared/search/search.component";
import { FilterComponent } from "../../../shared/filter/filter.component";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { PatrimonyService } from '../services/patrimony.services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormPropertyComponent } from './form-property/form-property.component';
import { InsertProperty, PropertyStatusEnum } from '../../../core/models/insert.property';

@Component({
  selector: 'app-property',
  standalone: true,
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss',
  imports: [CommonModule, CardComponent, SearchComponent, FilterComponent, ModalComponent, HttpClientModule, FormPropertyComponent],
})
export class PropertyComponent {

  public propertys: Array<InsertProperty> = [];
  public property: InsertProperty = new InsertProperty();
  public propertysBkp: Array<InsertProperty> = [];
  public filteredProperties: Array<InsertProperty> = [];

  public PropertyStatusEnum!: PropertyStatusEnum;

  public modalOpen: boolean = false;
  public openModalEdit: boolean = false;

  types: string[] = [];
  status: string[] = [];

  selectedType: string = "Todos";

  response: any;

  @Output() result: EventEmitter<number> = new EventEmitter();
  #patrimonyService = inject(PatrimonyService);
  constructor(private router: Router, private _toast: ToastrService) { }
  ngOnInit() {
    this.getProperty();
  }

  getProperty() {
    this.#patrimonyService.getProperty().result$.subscribe((response: any) => {
      if (response.data == null) return;
      this.propertys = response.data!.data;
      this.propertysBkp = response.data!.data;
      this.filteredProperties = response.data!.data;
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
      this.filteredProperties = this.propertysBkp?.filter((x) => this.noAccents(x.PropertyName.toUpperCase()).includes(search) || this.noAccents((x.Status.toString()).toUpperCase()).includes(search));

    } else this.filteredProperties = this.propertys;
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  filterProperty(event: any) {
    if (event.type === "Todos" && event.status === "Todos") this.filteredProperties = this.propertysBkp;
    else if (event.type === "Todos") {
      this.filteredProperties = this.propertysBkp.filter(property => property.Status === event.status);
    } else {
      this.filteredProperties = this.propertysBkp.filter(property => property.PropertyType === event.type && property.Status === event.status);
    }
  }

  addNew() {
    this.router.navigate(['/patrimony/new-property']);
  }

  deletePropertyById(id: number) {
    this.#patrimonyService.deletePropertyById(id).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Propriedade excluída com sucesso!', 'Sucesso');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao excluir propriedade!');
      }
      this.getProperty();
    });
  }

  editProperty(property: any) {
    this.openModalEdit = true;
    this.property = property;
  }
}
