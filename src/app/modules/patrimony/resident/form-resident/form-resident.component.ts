import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertResident, ResidentSpouse } from '../../../../core/models/insert-resident.model';
import { PatrimonyService } from '../../services/patrimony.services';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-form-resident',
  standalone: true,
  templateUrl: './form-resident.component.html',
  styleUrl: './form-resident.component.scss',
  imports: [CommonModule, HeaderTitleComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule, CardComponent, DropdownModule]
})
export class FormResidentComponent {
  #patrimonyService = inject(PatrimonyService);

  public form: InsertResident = new InsertResident();
  public spouse: ResidentSpouse = new ResidentSpouse();
  public retractInfo: boolean = true;

  protected colaboratorNames = computed(() => {
    const colaborators: any[] = [];

    this.#patrimonyService.getColaborators().result$.subscribe((res: any) => {
      res.data.data.map((colaborator: any) => {
        colaborators.push({ value: colaborator.id, label: colaborator.employeeName })
      });
    });

    colaborators.unshift({ value: 0, label: 'Selecione um colaborador' });
    return colaborators;
  });

  protected properties = computed(() => {
    const properties: any[] = [];

    this.#patrimonyService.getProperty().result$.subscribe((res: any) => {
      res.data.data.map((property: any) => {
        properties.push({ value: property.id, label: property.name })
      });
    });

    properties.unshift({ value: 0, label: 'Selecione um imóvel' });
    return properties;
  });


  selectedColaborator: any;

  @Input() edit: boolean = false;
  constructor(private _router: Router) { }

  selectProperty(event: any) {
    this.form.propertyId = Number(event.value);
  }

  cancel() {
    this.form = new InsertResident();
  }

  updateResident() {
    // Logic for update Resident
  }

  saveResident() {
    // Logic for save Resident
  }

  public navigateTo(path: string) {
    this._router.navigate(['patrimony/' + path]);
  }
}
