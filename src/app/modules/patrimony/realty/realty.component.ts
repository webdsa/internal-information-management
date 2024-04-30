import { Component, Input, SimpleChanges } from '@angular/core';
import { HeaderTitleComponent } from '../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { FormLabelComponent } from '../../../shared/form-label/form-label.component';
import typeValid, { FormMsgErrorComponent } from '../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealtyFormModel } from '../../../core/models/realtyForm.model';
import { PatrimonyService } from '../services/patrimony.services';
import { InsertProperty, DetailRealty } from '../../../core/models/insert.property';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-realty',
  standalone: true,
  imports: [CommonModule, HeaderTitleComponent, CardComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './realty.component.html',
  styleUrl: './realty.component.scss'
})
export class RealtyComponent {
  public form: InsertProperty = new InsertProperty();
  public retractInfo: boolean = true;
  public detailRealty: DetailRealty = new DetailRealty();

  @Input() realty: InsertProperty = new InsertProperty();

  constructor(private _formService: PatrimonyService, private _toast: ToastrService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkChanges(changes, 'realty')) {
      this.form = this.realty;
    }
  }

  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.currentValue;
  }

  saveProperty() {
    this.fillAdditionalData();
    this._formService.postProperty(this.form).subscribe({
      next: () => {
        this._toast.success('Sucesso!', 'Imóvel cadastrado com sucesso!');
        this.form = new InsertProperty();
      },
      error: () => this._toast.error('Ops! Algo deu errado!', 'Erro interno, já estamos trabalhando para resolver!'),
    });
  }

  fillAdditionalData() {
    this.form.AdditionalData.push(
      { Type: 0, Value: this.detailRealty.qtdRooms.toString() },
      // { Type: 1, Value: this.detailRealty.QtyBathrooms },
      // { Type: 2, Value: this.detailRealty. }, //IntercomNumber
      // { Type: 3, Value: this.detailRealty. }, //ConciergePhone
      { Type: 4, Value: this.detailRealty.observations }, //Observation
      { Type: 5, Value: this.detailRealty.codEnergy.toString() }, //EletricalCode
      { Type: 6, Value: this.detailRealty.codWater.toString() }, //WaterCode
      { Type: 7, Value: this.detailRealty.meterEnergy.toString() }, //EletricMeter
      // { Type: 8, Value: this.detailRealty. }, //QtyResidents
      { Type: 9, Value: this.detailRealty.limitPeople.toString() }, //QtyMaxResidents
      { Type: 10, Value: this.detailRealty.municipalRegister },//MunicipalRegistration
      // { Type: 11, Value: this.detailRealty. } //PropertyTax
    );
  }
}