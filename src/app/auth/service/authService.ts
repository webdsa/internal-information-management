import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { BaseService } from '../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseModel } from '../../core/models/response.model';

@Injectable({
    providedIn: 'root',
  })
  
export class AuthService extends BaseService {
  #http = inject(HttpClient);
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();

  constructor() {
    super();
  }

  public getUserPermissions() {
    return this.#query({
      queryKey: ['permission'],
      queryFn: () => this.#http.get<Array<ResponseModel<RoleTypeEnum>>>(this._urlBase + '/user/permission', this.ObterAuthHeader())
    });
  }
}
export enum RoleTypeEnum{
    Admin,
    Standard,
    Employee
}