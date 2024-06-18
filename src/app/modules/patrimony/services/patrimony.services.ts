import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PropertyModel } from '../../../core/models/property.model';
import { BaseService } from '../../../core/services/base.service';
import { InsertProperty } from '../../../core/models/insert.property';
import { injectQuery } from '@ngneat/query';


@Injectable({
  providedIn: 'root',
})
export class PatrimonyService extends BaseService {
  private _urlBase = environment.urlApi;
  private _urlGetProperty = `${this._urlBase}/property/list`;
  private _urlPostProperty = `${this._urlBase}/property`;

  #http = inject(HttpClient);
  #query = injectQuery();

  constructor() { super(); }

  public getProperty() {
    return this.#query({
      queryKey: ['property'],
      queryFn: () => this.#http.get<Array<PropertyModel>>(this._urlGetProperty, this.ObterAuthHeader())
    })
  }

  public getPropertyById(id: number) {
    return this.#query({
      queryKey: ['property', id],
      queryFn: () => this.#http.get<InsertProperty>(`${this._urlPostProperty}/${id}`, this.ObterAuthHeader())
    });
  }

  public postProperty(property: InsertProperty) {
    return this.#query({
      queryKey: ['property'],
      queryFn: () => this.#http.post<Array<InsertProperty>>(this._urlPostProperty, property, this.ObterAuthHeader())
    });
  }

  public deletePropertyById(id: number) {
    return this.#query({
      queryKey: ['property', id],
      queryFn: () => this.#http.delete<any>(`${this._urlPostProperty}/${id}`, this.ObterAuthHeader())
    });

  }
}
