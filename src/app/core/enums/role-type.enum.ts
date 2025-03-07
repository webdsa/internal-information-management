export enum RoleTypeEnum {
  Admin = 0,
  Standard = 1,
  Employee = 2
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
