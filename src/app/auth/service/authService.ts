import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { BaseService } from '../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ResponseModel } from '../../core/models/response.model';
import { RoleTypeEnum } from '../../core/enums/role-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  #http = inject(HttpClient);
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();

  private permissions: WritableSignal<RoleTypeEnum | undefined> = signal(undefined);

  public getUserPermissions(): RoleTypeEnum | undefined {
    return this.permissions();
  }
  protected setPermissions(permissions: RoleTypeEnum): void {
    this.permissions.set(permissions);
  }

  constructor() {
    super();
  }

  public getUserPermissionsByToken() {
    this.#query({
      queryKey: ['permission'],
      queryFn: () => this.#http.get<Array<ResponseModel<RoleTypeEnum>>>(this._urlBase + '/user/permission', this.ObterAuthHeader())
    });
  }
}
