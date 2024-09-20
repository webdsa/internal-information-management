import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { UpdateUserModel } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  #http = inject(HttpClient);
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();

  constructor() {
    super();
  }
  getAllUsers() {
    return this.#query({
      queryKey: ['users'],
      queryFn: () => this.#http.get<Array<any>>(this._urlBase + '/user/all', this.ObterAuthHeader())
    });
  }
  updateUserRole(userRole: UpdateUserModel) {
    return this.#mutation({
      mutationKey: ['updateUserRole'],
      mutationFn: () => this.#http.put(this._urlBase + '/user/permission', userRole, this.ObterAuthHeader()),
      onSuccess: () => {
        this._toast.success('Sucesso', 'Alteração realizada com sucesso');
        this.#client.invalidateQueries({ queryKey: ['users'] });
      },
      onError: () => {
        this._toast.success('Erro', 'Alteração não realizada com sucesso');
      }
    });
  }
}
