import { Component, EventEmitter, Input, Output, SimpleChanges, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { DetailRealty, GasTypeEnum, InsertProperty, PropertyAdditionalDataModel, PropertyTypeEnum } from '../../../../core/models/insert.property';
import { PatrimonyService } from '../../services/patrimony.services';
import { Router } from '@angular/router';
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
  @Input() edit: boolean = false;

  @Output() onEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  #patrimonyService = inject(PatrimonyService);
  constructor(private _toast: ToastrService, private _router: Router) { }

  ngOnInit(): void {
    if (this.realty && Object.keys(this.realty).length > 0) {
      this.form = this.realty ?? new InsertProperty();
      this.fillAdditionalDataByRealty(this.form.additionalData);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkChanges(changes, 'realty')) {
      this.form = this.realty ?? new InsertProperty();
    }
  }

  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.previousValue;
  }

  saveProperty() {
    this.fillAdditionalData();
    this.form.status = 0;
    this.form.propertyValue = 0;
    this.#patrimonyService.postProperty(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Imóvel cadastrado com sucesso!');
        this.form = new InsertProperty();
        this._router.navigate(['patrimony/property']);
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao cadastrar imóvel!');
      }
    });
  }

  updateProperty() {
    this.fillAdditionalData();
    this.form.status = 0;
    this.form.propertyValue = 0;
    this.#patrimonyService.putProperty(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Imóvel cadastrado com sucesso!');
        this.form = new InsertProperty();
        this.edit = false;
        this.onEdited.emit(true);
        this._router.navigate(['patrimony/property']);
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao cadastrar imóvel!');
      }
    });
  }

  fillAdditionalData() {
    this.form.additionalData = [];
    this.form.additionalData.push(
      { type: 0, value: this.detailRealty.qtyRooms.toString() ?? "0" },
      // { type: 1, value: this.detailRealty.QtyBathrooms },
      { type: 2, value: this.detailRealty.intercomNumber.toString() ?? "0" }, //IntercomNumber
      { type: 3, value: this.detailRealty.conciergePhone.toString() ?? "0" }, //ConciergePhone
      { type: 4, value: this.detailRealty.observation ?? "" }, //Observation
      { type: 5, value: this.detailRealty.eletricalCode.toString() ?? "0" }, //EletricalCode
      { type: 6, value: this.detailRealty.waterCode.toString() ?? "0" }, //WaterCode
      { type: 7, value: this.detailRealty.eletricMeter.toString() ?? "0" }, //EletricMeter
      // { type: 8, value: this.detailRealty. }, //QtyResidents
      { type: 9, value: this.detailRealty.qtyMaxResidents.toString() ?? "0" }, //QtyMaxResidents
      { type: 10, value: this.detailRealty.municipalRegistration ?? "0" },//MunicipalRegistration
      { type: 11, value: this.detailRealty.propertyTax ?? "0" } //PropertyTax
    );
  }

  fillAdditionalDataByRealty(additionalData: Array<PropertyAdditionalDataModel>) {
    if (!additionalData) return;
    additionalData.forEach((data) => {
      switch (data.type as number) {
        case 0:
          this.detailRealty.qtyRooms = Number(data.value);
          break;
        case 1:
          this.detailRealty.qtyBathrooms = Number(data.value);
          break;
        case 2:
          this.detailRealty.intercomNumber = Number(data.value);
          break;
        case 3:
          this.detailRealty.conciergePhone = Number(data.value);
          break;
        case 4:
          this.detailRealty.observation = data.value;
          break;
        case 5:
          this.detailRealty.eletricalCode = Number(data.value);
          break;
        case 6:
          this.detailRealty.waterCode = Number(data.value);
          break;
        case 7:
          this.detailRealty.eletricMeter = Number(data.value);
          break;
        case 9:
          this.detailRealty.qtyMaxResidents = Number(data.value);
          break;
        case 10:
          this.detailRealty.municipalRegistration = data.value;
          break;
        case 11:
          this.detailRealty.propertyTax = data.value;
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
    this.form.hasPhotovoltaic = Boolean(event.value);
  }
  selectIptu(event: any) {
    this.detailRealty.propertyTax = event.value;
  }
  selectOwnerName(event: any) {
    this.form.ownerName = event.value;
  }

  cancel() {
    this.form = new InsertProperty();
    this.detailRealty = new DetailRealty();
  }
}
