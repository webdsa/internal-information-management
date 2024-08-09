import { Component, EventEmitter, Input, InputSignal, Output, SimpleChanges, WritableSignal, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { DetailRealty, GasTypeEnum, InsertProperty, PropertyAdditionalDataModel, PropertyTypeEnum } from '../../../../core/models/insert.property';
import { PatrimonyService } from '../../services/patrimony.services';
import { ActivatedRoute, Router } from '@angular/router';
import { CorreiosService } from '../../../../core/services/correios.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ModalComponent } from "../../../../shared/modal/modal.component";
@Component({
  selector: 'app-form-property',
  standalone: true,
  imports: [CommonModule, HeaderTitleComponent, CardComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './form-property.component.html',
  styleUrl: './form-property.component.scss'
})
export class FormPropertyComponent {
  cep: string = '';
  resultado: any;
  private searchSubject = new Subject<string>();

  public openModalConfirm: boolean = false;
  public form: InsertProperty = new InsertProperty();
  public retractInfo: boolean = true;
  public detailRealty: DetailRealty = new DetailRealty();

  public typePropertyArray = Object.values(PropertyTypeEnum)
    .filter(key => typeof key === 'number')
    .map(key => ({
      label: PropertyTypeEnum[key as unknown as keyof typeof PropertyTypeEnum],
      value: key
    }));

  public typeGasArray = Object.values(GasTypeEnum)
    .filter(key => typeof key === 'number')
    .map(key => ({
      label: GasTypeEnum[key as unknown as keyof typeof GasTypeEnum],
      value: key
    }));


  realty:InputSignal<InsertProperty> = input(new InsertProperty());
  @Input() edit: boolean = false;

  @Output() onEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  #patrimonyService = inject(PatrimonyService);
  constructor(private _toast: ToastrService, private _router: Router, private _activatedRoute:ActivatedRoute, private correiosService: CorreiosService) {
    this._activatedRoute.url.subscribe(segments => {
      const fullPath = segments.join('/'); // Obtém o caminho completo da rota
      this.edit = fullPath.endsWith('/edit')??false; 
    });
    this.searchSubject.pipe(
      debounceTime(300), // Espera 300ms após o último evento
      distinctUntilChanged(), // Ignora se o próximo valor for igual ao anterior
      switchMap((cep: string) => this.correiosService.consultarCEP(cep))
    ).subscribe(
      data => {
        this.resultado = data;
        this.form.address = data.logradouro;
        this.form.city = data.localidade;
        this.form.complement = data.complemento;
        this.form.federativeUnit = data.uf;
        this.form.neighborhood = data.bairro;
      },
      error => {
        console.error('Erro ao consultar CEP', error);
      }
    );
  }

  ngOnInit(): void {
    if (this.realty() && Object.keys(this.realty()).length > 0) {
      this.form = this.realty();
      this.fillAdditionalDataByRealty(this.form.additionalData);
    }
    if(this.edit){
      this.#patrimonyService.currProperty.subscribe((property: InsertProperty) => {
        this.form = property;
        if(this.form != null) {
          this.edit = true;
          this.fillAdditionalDataByRealty(this.form.additionalData);
        }
      });
    }
    else{
      this.form = new InsertProperty();
    }

  }

  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.previousValue;
  }

  public openModalDelete() {
    this.openModalConfirm = true;
  }

  deletePropertyById(id: number,event:number) {
    if(event == 1){
      this.#patrimonyService.deletePropertyById(id).mutateAsync(null).then((res: any) => {
        if (res.succeeded) {
          this._toast.success('Propriedade excluída com sucesso!', 'Sucesso');
          this.onEdited.emit(true);
          this._router.navigate(['patrimony/property']);
        } else {
          this._toast.error('Procure a equipe de suporte.', 'Erro ao excluir propriedade!');
        }
      });
    }else{
      this.openModalConfirm = false
    }

  }

  onKeyUp(event: any): void {
    const input = event.target.value;
    if (input.length >= 8) { // Verifica se o CEP tem pelo menos 8 caracteres
      this.searchSubject.next(input);
    }
  }

  consultarCEP() {
    this.correiosService.consultarCEP(this.cep).subscribe(
      data => {
        this.resultado = data;
      },
      error => {
        console.error('Erro ao consultar CEP', error);
      }
    );
  }

  saveProperty() {
    this.fillAdditionalData();
    this.form.status = 0;
    // this.form.propertyValue = 0;
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
    // this.form.propertyValue = 0;
    this.#patrimonyService.putProperty(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Imóvel editado com sucesso!');
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
      { type: 3, value: this.detailRealty.conciergePhone ?? "0" }, //ConciergePhone
      { type: 4, value: this.detailRealty.observation ?? "" }, //Observation
      { type: 5, value: this.detailRealty.eletricalCode.toString() ?? "0" }, //EletricalCode
      { type: 6, value: this.detailRealty.waterCode ?? "0" }, //WaterCode
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
          this.detailRealty.conciergePhone = Number(data.value).toString();
          break;
        case 4:
          this.detailRealty.observation = data.value;
          break;
        case 5:
          this.detailRealty.eletricalCode = Number(data.value);
          break;
        case 6:
          this.detailRealty.waterCode = Number(data.value).toString();
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
    this.onEdited.emit(true);
    this._router.navigate(['patrimony/property']);
    // this.form = new InsertProperty();
    // this.detailRealty = new DetailRealty();
  }
}
