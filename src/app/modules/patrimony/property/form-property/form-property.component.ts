import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { DetailRealty, InsertProperty } from '../../../../core/models/insert.property';
import { PatrimonyService } from '../../services/patrimony.services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-property',
  standalone: true,
  imports: [CommonModule, HeaderTitleComponent, CardComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './form-property.component.html',
  styleUrl: './form-property.component.scss'
})
export class FormPropertyComponent {
  public form: InsertProperty = new InsertProperty();
  public retractInfo: boolean = true;
  public detailRealty: DetailRealty = new DetailRealty();

  @Input() realty: InsertProperty = new InsertProperty();

  constructor(private _formService: PatrimonyService, private _rout: ActivatedRoute) { }

  ngOnInit(): void {
    this._rout.params.subscribe(params => {
      if (params['id']) {
        this._formService.getPropertyById(params['id']).subscribe({
          next: (response) => {
            this.realty = response.data!;
          }
        });
      }
    });
  
    
  }
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
    this.form.PropertyType = Number(this.form.PropertyType);
    this._formService.postProperty(this.form).subscribe({
      next: () => {
        // this._toast.success('Sucesso!', 'Imóvel cadastrado com sucesso!');
        this.form = new InsertProperty();
        this.form.AdditionalData = [];
      },
      error: () => { } //this._toast.error('Ops! Algo deu errado!', 'Erro interno, já estamos trabalhando para resolver!'),
    });
  }

  fillAdditionalData() {
    if (!this.form.AdditionalData) {
      this.form.AdditionalData = [];
    }
    this.form.AdditionalData.push(
      { Type: 0, Value: this.detailRealty.qtdRooms.toString()??"0" },
      // { Type: 1, Value: this.detailRealty.QtyBathrooms },
      // { Type: 2, Value: this.detailRealty. }, //IntercomNumber
      // { Type: 3, Value: this.detailRealty. }, //ConciergePhone
      { Type: 4, Value: this.detailRealty.observations??"" }, //Observation
      { Type: 5, Value: this.detailRealty.codEnergy.toString()??"0" }, //EletricalCode
      { Type: 6, Value: this.detailRealty.codWater.toString()??"0" }, //WaterCode
      { Type: 7, Value: this.detailRealty.meterEnergy.toString()??"0" }, //EletricMeter
      // { Type: 8, Value: this.detailRealty. }, //QtyResidents
      { Type: 9, Value: this.detailRealty.limitPeople.toString()??"0" }, //QtyMaxResidents
      { Type: 10, Value: this.detailRealty.municipalRegister??"0" },//MunicipalRegistration
      // { Type: 11, Value: this.detailRealty. } //PropertyTax
    );
  }
}
