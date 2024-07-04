import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertResident } from '../../../../core/models/insert-resident.model';
import { DetailRealty } from '../../../../core/models/insert.property';
import { PatrimonyService } from '../../services/patrimony.services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-form-resident',
    standalone: true,
    templateUrl: './form-resident.component.html',
    styleUrl: './form-resident.component.scss',
    imports: [CommonModule, HeaderTitleComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule, CardComponent]
})
export class FormResidentComponent {
  public form: InsertResident = new InsertResident();
  public detailRealty: DetailRealty = new DetailRealty();
  public retractInfo: boolean = true;
  @Input() edit: boolean = false;

  #patrimonyService = inject(PatrimonyService);

  constructor (private _router: Router) {}

  selectMaritalStatus(event: any) {
    this.form.maritalStatus = event.value;
  }

  selectProperty(event: any) {
    this.form.propertyId = Number(event.value);
  }

  cancel() {
    this.form = new InsertResident();
    this.detailRealty = new DetailRealty();
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
