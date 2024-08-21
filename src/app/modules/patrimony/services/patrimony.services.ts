import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../core/services/base.service';
import { InsertProperty } from '../../../core/models/insert.property';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { InsertProvider } from '../../../core/models/insert.provider';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Residents } from '../../../core/models/property.model';
import { observeNotification } from 'rxjs/internal/Notification';


@Injectable({
  providedIn: 'root',
})
export class PatrimonyService extends BaseService {
  private _urlBase = environment.urlApi;
  private _urlGetProperty = `${this._urlBase}/property/list`;
  private _urlPostProperty = `${this._urlBase}/property`;
  private _urlProvider = `${this._urlBase}/provider`;

  private property: BehaviorSubject<InsertProperty> = new BehaviorSubject<InsertProperty>(new InsertProperty());
  private residents: BehaviorSubject<Residents> = new BehaviorSubject<Residents>(new Residents());
  public currProperty= this.property.asObservable();
  public currResidents = this.residents.asObservable();

  #http = inject(HttpClient);
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();

  constructor() { super(); }

  public changeProperty(Property: InsertProperty) {
    this.property.next(Property);
  }

  public changeResident(residents: Residents) {
    this.residents.next(residents);
  }

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

  public activePropertyById(id: number, property: InsertProperty) {
    return this.#mutation({
      mutationKey: ['property'],
      mutationFn: () => this.#http.put<InsertProperty>(`${this._urlPostProperty}/active/${id}`, property, this.ObterAuthHeader())
    });
  }

  public inactivePropertyById(id: number, property: InsertProperty) {
    return this.#mutation({
      mutationKey: ['property'],
      mutationFn: () => this.#http.put(`${this._urlBase}/property/inactive/${id}?observation=property-inactive`, property, this.ObterAuthHeader()),
    });
  }

  public getProvider() {
    return this.#query({
      queryKey: ['provider'],
      queryFn: () => this.#http.get<Array<InsertProvider>>(this._urlProvider, this.ObterAuthHeader())
    });
  }
  public deleteProviderById(id: number) {
    return this.#mutation({
      mutationKey: ['provider'],
      mutationFn: () => this.#http.delete(`${this._urlBase}/${id}`, this.ObterAuthHeader())
    });
  }
  public postProvider(provider: InsertProvider) {
    return this.#mutation({
      mutationKey: ['provider'],
      mutationFn: () => this.#http.post<InsertProvider>(this._urlProvider, provider, this.ObterAuthHeader())
    });
  }
  public updateProvider(provider: InsertProvider) {
    return this.#mutation({
      mutationKey: ['provider'],
      mutationFn: () => this.#http.put<InsertProvider>(this._urlProvider, provider, this.ObterAuthHeader())
    });
  }
  public getColaborators() {
    return this.#query({
      queryKey: ['colaborators'],
      queryFn: () => this.#http.get(`${this._urlBase}/Collaborators`, this.ObterAuthHeader())
    });
  }
  public postColaborator(colaborator: any) {
    return this.#mutation({
      mutationKey: ['colaborator'],
      mutationFn: () => this.#http.post(`${this._urlPostProperty}/resident`, colaborator, this.ObterAuthHeader())
    });
  }
  public getColaboratorsByPropert() {
    return this.#query({
      queryKey: ['list-colaborators'],
      queryFn: () => this.#http.get(`${this._urlPostProperty}/list`, this.ObterAuthHeader())
    });
  }
}
