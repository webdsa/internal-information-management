export class PropertyModel {
    id!: number;
    ownerName!: string;
    propertyName!: string;
    propertyType!: string;
    status!: string;
    postalCode!: string;
    address!: string;
    complement!: string;
    neighborhood!: string;
    city!: string;
    federativeUnit!: string;
    hasPhotovoltaic!: true;
    propertyValue!: number;
    gasType!: string;
    additionalData!: Array<AditionalData>;
    residents!: Array<Residents>;
}
export class AditionalData {
    id!: number;
    type!: number;
    value!: string;
}


export class Residents {
    collaborator!: Colaborator;
    spouse!: ResidentSpouse;
    entryAt!: Date;
    departureAt!: Date
}

export class Colaborator {
    id!: number;
    entityCode!: number;
    entityName!: string;
    codeAPS!: number;
    cpf!: string;
    employeeName!: string;
    email!: string;
    maritalStatus!: string;
    birthdate!: Date;
    gender!: string;
    isReligious!: true;
    departmentName!: string;
    nameOccupational!: string;
    groupEmployee!: string;
    phoneNumber!: string;
    spouseData!: ResidentSpouse;
}
export class ResidentSpouse {
    name!: string;
    email!: string;
    phoneNumber!: string
}
