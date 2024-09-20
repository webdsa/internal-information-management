export enum RoleTypeEnum {
  Admin = 1,
  Standard = 2,
  Employee = 3
}

export const RoleTypeEnumTranslation = {
  [RoleTypeEnum.Admin]: 'Administrador',
  [RoleTypeEnum.Standard]: 'Padrão',
  [RoleTypeEnum.Employee]: 'Funcionário'
};

export namespace RoleTypeEnum {
  export function Array(): any {
    return Object.values(RoleTypeEnum)
      .filter((value): value is RoleTypeEnum => typeof value === 'number')
      .map((key) => ({
        key: key,
        value: RoleTypeEnum[key],
        translated: RoleTypeEnumTranslation[key],
        item: RoleTypeEnum[key]
      }));
  }
}
