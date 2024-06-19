import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { DetailRealty, GasTypeEnum, InsertProperty, PropertyTypeEnum } from '../../../../core/models/insert.property';
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

  public typePropertyArray = Object.keys(PropertyTypeEnum)
    .filter(key => !isNaN(Number(key)))
    .map(key => ({
      label: PropertyTypeEnum[key as keyof typeof PropertyTypeEnum],
      value: key
    }));

  public typeGasArray = Object.keys(GasTypeEnum)
    .filter(key => !isNaN(Number(key)))
    .map(key => ({
      label: GasTypeEnum[key as keyof typeof GasTypeEnum],
      value: key
    }));


  @Input() realty: InsertProperty = new InsertProperty();
  #patrimonyService = inject(PatrimonyService);
  constructor(private _toast: ToastrService) { }

  ngOnInit(): void { }
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
    this.form.Status = 0;
    this.form.PropertyValue = 0;
    this.#patrimonyService.postProperty(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Imóvel cadastrado com sucesso!');
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao cadastrar imóvel!');
      }
    });
  }

  fillAdditionalData() {
    this.form.AdditionalData = [];
    this.form.AdditionalData.push(
      { Type: 0, Value: this.detailRealty.qtdRooms.toString() ?? "0" },
      // { Type: 1, Value: this.detailRealty.QtyBathrooms },
      // { Type: 2, Value: this.detailRealty. }, //IntercomNumber
      // { Type: 3, Value: this.detailRealty. }, //ConciergePhone
      { Type: 4, Value: this.detailRealty.observations ?? "" }, //Observation
      { Type: 5, Value: this.detailRealty.codEnergy.toString() ?? "0" }, //EletricalCode
      { Type: 6, Value: this.detailRealty.codWater.toString() ?? "0" }, //WaterCode
      { Type: 7, Value: this.detailRealty.meterEnergy.toString() ?? "0" }, //EletricMeter
      // { Type: 8, Value: this.detailRealty. }, //QtyResidents
      { Type: 9, Value: this.detailRealty.limitPeople.toString() ?? "0" }, //QtyMaxResidents
      { Type: 10, Value: this.detailRealty.municipalRegister ?? "0" },//MunicipalRegistration
      { Type: 11, Value: this.detailRealty.propertyTax } //PropertyTax
    );
  }

  selectProperty(event: any) {
    this.form.PropertyType = Number(event.value);
  }

  selectGas(event: any) {
    this.form.GasType = Number(event.value);
  }

  selectSolarPower(event: any) {
    this.detailRealty.hasPhotovoltaic = Boolean(event.value);
  }
  selectIptu(event: any) {
    this.detailRealty.propertyTax = event.value;
  }
  selectOwnerName(event: any) {
    this.form.OwnerName = event.value;
  }
}
