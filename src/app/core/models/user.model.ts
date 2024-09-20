import { RoleTypeEnum } from '../enums/role-type.enum';

export class UserModel {
  id!: number;
  userName!: string;
  userEmail!: string;
  role!: RoleTypeEnum;
}

export class UpdateUserModel {
  userEmail!: string;
  roleId!: number;
}
