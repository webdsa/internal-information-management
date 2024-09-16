export class InsertResident {
  propertyId!: number;
  collaboratorId!: number;
  entryAt!: Date;
  departureAt!: Date;
  spouse!: ResidentSpouse;
  rentCeiling!: number;
}

export class ResidentSpouse {
  name!: string;
  email!: string;
  phoneNumber!: string;
}