export class InsertProperty {
    id!: number;
    ownerName!: string;
    propertyName!: string;
    propertyType!: PropertyTypeEnum;
    status!: PropertyStatusEnum;
    postalCode!: string;
    address!: string;
    complement!: string;
    neighborhood!: string;
    city!: string;
    federativeUnit!: string;
    hasPhotovoltaic!: boolean;
    propertyValue!: number;
    gasType!: GasTypeEnum;
    additionalData!: Array<PropertyAdditionalDataModel>;
}

export enum PropertyTypeEnum {
    Apartment = 0,
    House = 1,
    Academy = 2
}

export namespace PropertyTypeEnum {
  export function Array() {
    return Object.keys(PropertyTypeEnum)
        .filter((e) => !isNaN(+e))
        .map((k) => ({
            key: Number(k),
            value: PropertyTypeEnum[k as any],
            item: k,
        }));
}
}

export enum PropertyStatusEnum {
    Buzy = 0,
    NotBuzy = 1,
    Sold = 2,
    Delivered = 3,
    NotControlled = 4,
    NotUsed = 5
}

export enum GasTypeEnum {
    P13 = 0,
    P45 = 1,
    Plumbed = 2
}
export class PropertyAdditionalDataModel {
    type!: number;
    value!: string;
}

export enum PropertyAdditionalDataType {
    QtyRooms = 0,
    QtyBathrooms = 1,
    IntercomNumber = 2,
    ConciergePhone = 3,
    Observation = 4,
    EletricalCode = 5,
    WaterCode = 6,
    EletricMeter = 7,
    QtyResidents = 8,
    QtyMaxResidents = 9,
    MunicipalRegistration = 10,
    PropertyTax = 11
}
export class DetailRealty {
    typeGas!: any;
    qtyRooms!: number;
    qtyBathrooms!: number;
    qtyMaxResidents!: number;
    eletricalCode!: number;
    eletricMeter!: number;
    waterCode!: string;
    municipalRegistration!: string;
    propertyTax!: string;
    intercomNumber!: number;
    conciergePhone!: string;
    emailConcierge!: string;
    observation!: string;
}
