export class InsertProperty {
    id!: number;
    OwnerName!: string;
    PropertyName!: string;
    PropertyType!: PropertyTypeEnum;
    Status!: PropertyStatusEnum;
    PostalCode!: string;
    Address!: string;
    Complement!: string;
    Neighborhood!: string;
    City!: string;
    FederativeUnit!: string;
    HasPhotovoltaic!: boolean;
    PropertyValue!: number;
    GasType!: GasTypeEnum;
    AdditionalData!: Array<PropertyAdditionalDataModel>;

}

export enum PropertyTypeEnum {
    Apartment,
    House,
    Academy
}

export enum PropertyStatusEnum {
    Buzy,
    NotBuzy,
    Sold,
    Delivered,
    NotControlled,
    NotUsed
}

export enum GasTypeEnum {
    P13,
    P45,
    Plumbed
}
export class PropertyAdditionalDataModel {
    Type!: number;
    Value!: any;
}

export enum PropertyAdditionalDataType {
    QtyRooms,
    QtyBathrooms,
    IntercomNumber,
    ConciergePhone,
    Observation,
    EletricalCode,
    WaterCode,
    EletricMeter,
    QtyResidents,
    QtyMaxResidents,
    MunicipalRegistration,
    PropertyTax
}

export class DetailRealty {
    hasPhotovoltaic!: boolean;
    typeGas!: any;
    qtdRooms!: number;
    limitPeople!: number;
    codEnergy!: number;
    meterEnergy!: number;
    codWater!: number;
    municipalRegister!: string;
    propertyTax!: string;
    realtyValue!: number;
    numberPhone!: number;
    numberPhone2!: number;
    emailConcierge!: string;
    observations!: string;
}
