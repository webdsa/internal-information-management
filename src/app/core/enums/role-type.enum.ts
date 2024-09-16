export enum RoleTypeEnum {
  Admin,
  Standard,
  Employee
}
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
