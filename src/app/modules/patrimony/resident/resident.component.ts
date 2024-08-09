import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchComponent } from "../../../shared/search/search.component";
import { FilterComponent } from "../../../shared/filter/filter.component";
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from "../../../shared/card/card.component";
import { PatrimonyService } from '../services/patrimony.services';
import { PropertyModel, Residents } from '../../../core/models/property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resident',
  standalone: true,
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss',
  imports: [CommonModule, RouterOutlet, SearchComponent, FilterComponent, CardComponent]
})
export class ResidentComponent {

  public residents: Array<Residents> = [];
  public property: Array<PropertyModel> = new Array<PropertyModel>();
  public resident: Residents = new Residents();
  public residentsBkp: Array<Residents> = [];
  public filteredResident: Array<Residents> = [];

  #patrimonyService = inject(PatrimonyService);
  constructor(private router: Router, private _toast: ToastrService) { }

  ngOnInit(): void {
    this.#patrimonyService.getColaboratorsByPropert().result$.subscribe((res: any) => {
      if (res?.data?.data?.length > 0) {
        this.property = res.data.data;
        this.residents = res.data.data.residents;
        this.residentsBkp = res.data.data.residents;
        this.filteredResident = res.data.data.residents;
      }
    });

  }
  searchByName(search: string) {
    if (search != '' && search != undefined) {
      search = this.noAccents(search);
      this.filteredResident = this.residentsBkp?.filter(resident => {
        return this.noAccents(resident.spouse.name.toUpperCase()).includes(search.toUpperCase());
      });
    } else this.filteredResident = this.residents;
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterProperty(event: any) {
    if (event.type === "Todos" && event.status === "Todos") this.filteredResident = this.residentsBkp;
  }

  addNew() {
    this.router.navigate(['/patrimony/new-resident']);
  }

  editResident(){
    
  }
}
