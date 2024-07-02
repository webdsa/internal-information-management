import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { SearchComponent } from '../../../shared/search/search.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { PatrimonyService } from '../services/patrimony.services';
import { FormProviderComponent } from './form-provider/form-provider.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InsertProvider } from '../../../core/models/insert.provider';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [CommonModule, CardComponent, SearchComponent, FilterComponent, ModalComponent, HttpClientModule, FormProviderComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent {
  public providers: Array<InsertProvider> = [];
  public provider: InsertProvider = new InsertProvider();
  public providersBkp: Array<InsertProvider> = [];
  public filteredProviders: Array<InsertProvider> = [];

  public modalOpen: boolean = false;
  public openModalEdit: boolean = false;
  @Output() result: EventEmitter<number> = new EventEmitter();
  #patrimonyService = inject(PatrimonyService);
  constructor(private router: Router, private _toast: ToastrService) { }
  ngOnInit() {
    this.getProvider();
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
      this.filteredProviders = this.providersBkp?.filter((x) => this.noAccents(x.name.toUpperCase()).includes(search) || this.noAccents((x.number.toString()).toUpperCase()).includes(search));

    } else this.filteredProviders = this.providers;
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  // filterProvider(event: any) {
  //   if (event.type === "Todos" && event.status === "Todos") this.filteredProviders = this.providersBkp;
  //   else if (event.type === "Todos") {
  //     this.filteredProviders = this.providersBkp.filter(provider => provider.number === event.number);
  //   } else {
  //     this.filteredProviders = this.providersBkp.filter(provider => provider.providerType === event.type && provider.status === event.status);
  //   }
  // }
  addNew() {
    this.router.navigate(['/patrimony/new-provider']);
  }

  getProvider() {
    this.#patrimonyService.getProvider().result$.subscribe((response: any) => {
      if (response.data == null) return;
      this.providers = response.data!.data;
      this.providersBkp = response.data!.data;
      this.filteredProviders = response.data!.data;
    });
  }
  editProvider(provider: any) {
    this.openModalEdit = true;
    this.provider = provider;
  }
  deleteProviderById(id: number) {
    this.#patrimonyService.deleteProviderById(id).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Fornecedor excluído com sucesso!');
        this.getProvider();
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao excluir fornecedor!');
      }
    });
  }
}
