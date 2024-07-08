export class InsertResident {
  propertyId!: number;
  collaboratorId!: number;
  entryAt!: Date;
  departureAt!: Date;
  spouse!: ResidentSpouse;
}

export class ResidentSpouse {
  name!: string;
  email!: string;
  phoneNumber!: string;
}