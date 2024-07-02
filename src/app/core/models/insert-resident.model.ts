export class InsertResident {
  propertyId!: number;
  collaboradorId!: number;
  entryAt!: Date;
  departureAt!: Date;
  spouse!: ResidentSpouse;
}

export class ResidentSpouse {
  name!: string;
  email!: string;
  phoneNumber!: string;
}
