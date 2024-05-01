import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../core/models/response.model';
import { PropertyModel } from '../../../core/models/property.model';
import { BaseService } from '../../../core/services/base.service';
import { InsertProperty } from '../../../core/models/insert.property';


@Injectable({
  providedIn: 'root',
})
export class PatrimonyService extends BaseService {
  private _urlBase = environment.urlApi;
  private _urlGetProperty = `${this._urlBase}/property/list`;
  private _urlPostProperty = `${this._urlBase}/property`;

  constructor(private _http: HttpClient) { super(); }

  public getProperty(): Observable<ResponseModel<Array<PropertyModel>>> {
    return this._http.get<ResponseModel<Array<PropertyModel>>>(this._urlGetProperty, this.ObterAuthHeader());
  }

  public getPropertyById(id: number): Observable<ResponseModel<InsertProperty>> {
    return this._http.get<ResponseModel<InsertProperty>>(`${this._urlPostProperty}/${id}`, this.ObterAuthHeader());
  }

  public postProperty(property: InsertProperty) {
    return this._http.post<ResponseModel<Array<InsertProperty>>>(this._urlPostProperty, property, this.ObterAuthHeader());
  }

  public deletePropertyById(id: number):Observable<ResponseModel<any>> {
    return this._http.delete<ResponseModel<any>>(`${this._urlPostProperty}/${id}`, this.ObterAuthHeader());
  }
}
