import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../core/services/base.service';
import { InsertProperty } from '../../../core/models/insert.property';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { InsertProvider } from '../../../core/models/insert.provider';


@Injectable({
  providedIn: 'root',
})
export class PatrimonyService extends BaseService {
  private _urlBase = environment.urlApi;
  private _urlGetProperty = `${this._urlBase}/property/list`;
  private _urlPostProperty = `${this._urlBase}/property`;
  private _urlGetProvider = `${this._urlBase}/provider/`;

  #http = inject(HttpClient);
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();

  constructor() { super(); }

  public getProperty() {
    return this.#query({
      queryKey: ['property'],
      queryFn: () => this.#http.get<Array<InsertProperty>>(this._urlGetProperty, this.ObterAuthHeader())
    })
  }

  public getPropertyById(id: number) {
    return this.#query({
      queryKey: ['property', id],
      queryFn: () => this.#http.get<InsertProperty>(`${this._urlPostProperty}/${id}`, this.ObterAuthHeader())
    });
  }

  public postProperty(property: InsertProperty) {
    return this.#mutation({
      mutationKey: ['property'],
      mutationFn: () => this.#http.post<InsertProperty>(this._urlPostProperty, property, this.ObterAuthHeader())
    });
  }
  public putProperty(property: InsertProperty) {
    return this.#mutation({
      mutationKey: ['property'],
      mutationFn: () => this.#http.put<InsertProperty>(this._urlPostProperty, property, this.ObterAuthHeader())
    });
  }

  public deletePropertyById(id: number) {
    return this.#mutation({
      mutationKey: ['property'],
      mutationFn: () => this.#http.delete(`${this._urlPostProperty}/${id}`, this.ObterAuthHeader())
    });
  }

  public getProvider() {
    return this.#query({
      queryKey: ['provider'],
      queryFn: () => this.#http.get<Array<InsertProvider>>(this._urlGetProvider, this.ObterAuthHeader())
    });
  }
  public deleteProviderById(id: number) {
    return this.#mutation({
      mutationKey: ['provider'],
      mutationFn: () => this.#http.delete(`${this._urlGetProvider}/${id}`, this.ObterAuthHeader())
    });
  }
  public postProvider(provider: InsertProvider) {
    return this.#mutation({
      mutationKey: ['provider'],
      mutationFn: () => this.#http.post<InsertProvider>(this._urlGetProvider, provider, this.ObterAuthHeader())
    });
  }
  public updateProvider(provider: InsertProvider) {
    return this.#mutation({
      mutationKey: ['provider'],
      mutationFn: () => this.#http.put<InsertProvider>(this._urlGetProvider, provider, this.ObterAuthHeader())
    });
  }
}
