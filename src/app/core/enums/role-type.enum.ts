export enum RoleTypeEnum {
  Admin,
  Standard,
  Employee
}

export const RoleTypeEnumTranslation = {
  [RoleTypeEnum.Admin]: 'Administrador',
  [RoleTypeEnum.Standard]: 'Padrão',
  [RoleTypeEnum.Employee]: 'Funcionário'
};

export namespace RoleTypeEnum {
  export function Array() {
    return Object.keys(RoleTypeEnum)
      .filter((e) => !isNaN(+e))
      .map((k) => ({
        key: Number(k),
        value: RoleTypeEnum[k as any],
        item: k
      }));
  }
}
