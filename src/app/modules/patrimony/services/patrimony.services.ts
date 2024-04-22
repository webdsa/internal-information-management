import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../core/models/response.model';
import { PropertyModel } from '../../../core/models/property.model';
import { BaseService } from '../../../core/services/base.service';


@Injectable({
  providedIn: 'root',
})
export class PatrimonyService extends BaseService {
  private _urlBase = environment.urlApi;
  private _urlGetProperty = `${this._urlBase}/property/list`;

  constructor(private _http: HttpClient) { super();}
 
  public getProperty():Observable<ResponseModel<Array<PropertyModel>>> {
  return this._http.get<ResponseModel<Array<PropertyModel>>>(this._urlGetProperty,this.ObterAuthHeaderJson());
  }
}
