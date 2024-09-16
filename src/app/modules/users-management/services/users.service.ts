import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';

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
      queryFn: () => this.#http.get<Array<any>>(this._urlBase + '/Collaborators', this.ObterAuthHeader())
    });
  }
}
