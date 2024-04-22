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
  hasPhotovoltaic!: boolean;
  propertyValue!: number;
  gasType!: string;
  additionalData!: Array<AdditionalData>;
}
export class AdditionalData {
  id!: number;
  type!: string;
  value!: string;

}
// proprietary!: string;
// fotovoltaica!: boolean;
// ge_di!: boolean;
// status!: string;
// type_gas!: string;
// type!: string;
// edifice!: string;
// address!: string;
// items!: PropertyModel[];