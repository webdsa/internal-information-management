export class RealtyFormModel {
    id!: number;
    proprietary!: any;
    typeRealty!: any;
    CEP!: number;
    address!: string;
    complement!: string;
    neighborhood!: string;
    city!: string;
    UF!: string;
    nameBuilding!: string;
    detailRealty: detailRealty = new detailRealty();
  }
  export class detailRealty {
    hasSolarPower!: boolean;
    typeGas!: any;
    qtdRooms!: number;
    limitPeople!: number;
    codEnergy!: number;
    meterEnergy!: number;
    codWater!: number;
    municipalRegister!: string;
    codIPTU!: number;
    realtyValue!: number;
    numberPhone!: number;
    numberPhone2!: number;
    emailConcierge!: string;
    observations!: string;
  }
  