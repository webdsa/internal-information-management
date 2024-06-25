import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { DetailRealty, GasTypeEnum, InsertProperty, PropertyAdditionalDataModel, PropertyTypeEnum } from '../../../../core/models/insert.property';
import { PatrimonyService } from '../../services/patrimony.services';
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


  public typePropertyArray = Object.values(PropertyTypeEnum)
    .filter(key => typeof key === 'number')
    .map(key => ({
      label: PropertyTypeEnum[key as keyof typeof PropertyTypeEnum],
      value: key
    }));

  public typeGasArray = Object.values(GasTypeEnum)
    .filter(key => typeof key === 'number')
    .map(key => ({
      label: GasTypeEnum[key as keyof typeof GasTypeEnum],
      value: key
    }));


  @Input() realty: InsertProperty = new InsertProperty();
  #patrimonyService = inject(PatrimonyService);
  constructor(private _toast: ToastrService) { }

  ngOnInit(): void {
    this.form = this.realty ?? new InsertProperty();
    this.fillAdditionalDataByRealty(this.form.additionalData);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkChanges(changes, 'realty')) {
      this.form = this.realty ?? new InsertProperty();
    }
  }

  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.currentValue;
  }

  saveProperty() {
    this.fillAdditionalData();
    this.form.status = 0;
    this.form.propertyValue = 0;
    this.#patrimonyService.postProperty(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Imóvel cadastrado com sucesso!');
        this.form = new InsertProperty();
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao cadastrar imóvel!');
      }
    });
  }

  fillAdditionalData() {
    this.form.additionalData = [];
    this.form.additionalData.push(
      { Type: 0, Value: this.detailRealty.qtyRooms.toString() ?? "0" },
      // { Type: 1, Value: this.detailRealty.QtyBathrooms },
      { Type: 2, Value: this.detailRealty.intercomNumber.toString() ?? "0" }, //IntercomNumber
      { Type: 3, Value: this.detailRealty.conciergePhone.toString() ?? "0" }, //ConciergePhone
      { Type: 4, Value: this.detailRealty.observation ?? "" }, //Observation
      { Type: 5, Value: this.detailRealty.eletricalCode.toString() ?? "0" }, //EletricalCode
      { Type: 6, Value: this.detailRealty.waterCode.toString() ?? "0" }, //WaterCode
      { Type: 7, Value: this.detailRealty.eletricMeter.toString() ?? "0" }, //EletricMeter
      // { Type: 8, Value: this.detailRealty. }, //QtyResidents
      { Type: 9, Value: this.detailRealty.qtyMaxResidents.toString() ?? "0" }, //QtyMaxResidents
      { Type: 10, Value: this.detailRealty.municipalRegistration ?? "0" },//MunicipalRegistration
      { Type: 11, Value: this.detailRealty.propertyTax ?? "0" } //PropertyTax
    );
  }

  fillAdditionalDataByRealty(additionalData: Array<PropertyAdditionalDataModel>) {
    if (!additionalData) return;
    additionalData.forEach((data) => {
      switch (data.Type) {
        case 0:
          this.detailRealty.qtyRooms = Number(data.Value);
          break;
        case 1:
          this.detailRealty.qtyBathrooms = Number(data.Value);
          break;
        case 2:
          this.detailRealty.intercomNumber = Number(data.Value);
          break;
        case 3:
          this.detailRealty.conciergePhone = Number(data.Value);
          break;
        case 4:
          this.detailRealty.observation = data.Value;
          break;
        case 5:
          this.detailRealty.eletricalCode = Number(data.Value);
          break;
        case 6:
          this.detailRealty.waterCode = Number(data.Value);
          break;
        case 7:
          this.detailRealty.eletricMeter = Number(data.Value);
          break;
        case 9:
          this.detailRealty.qtyMaxResidents = Number(data.Value);
          break;
        case 10:
          this.detailRealty.municipalRegistration = data.Value;
          break;
        case 11:
          this.detailRealty.propertyTax = data.Value;
          break;
      }
    });
  }

  selectProperty(event: any) {
    this.form.propertyType = Number(event.value);
  }

  selectGas(event: any) {
    this.form.gasType = Number(event.value);
  }

  selectSolarPower(event: any) {
    this.detailRealty.hasPhotovoltaic = Boolean(event.value);
  }
  selectIptu(event: any) {
    this.detailRealty.propertyTax = event.value;
  }
  selectOwnerName(event: any) {
    this.form.ownerName = event.value;
  }
}
