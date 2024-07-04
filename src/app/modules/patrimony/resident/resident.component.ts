import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchComponent } from "../../../shared/search/search.component";
import { FilterComponent } from "../../../shared/filter/filter.component";
import { InsertResident } from '../../../core/models/insert-resident.model';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from "../../../shared/card/card.component";

@Component({
  selector: 'app-resident',
  standalone: true,
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss',
  imports: [RouterOutlet, SearchComponent, FilterComponent, CardComponent]
})
export class ResidentComponent {

  public residents: Array<InsertResident> = [];
  public resident: InsertResident = new InsertResident();
  public residentsBkp: Array<InsertResident> = [];
  public filteredResident: Array<InsertResident> = [];

  constructor(private router: Router, private _toast: ToastrService) { }

  searchByName(search: string) {
    if (search != '' && search != undefined) {
      search = this.noAccents(search);
      this.filteredResident = this.residentsBkp?.filter((x) => this.noAccents(x.spouse.name.toUpperCase()).includes(search));

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
}
