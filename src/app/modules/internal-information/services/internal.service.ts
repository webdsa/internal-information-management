import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../core/services/base.service';
import { injectQuery } from '@ngneat/query';


@Injectable({
    providedIn: 'root',
})
export class InternalService extends BaseService {
    private _urlBase = environment.urlApi;
    private _urlAllGuid = `${this._urlBase}/guide/topic/all`;

    #http = inject(HttpClient);
    #query = injectQuery();

    constructor() { super(); }


    public getAllGuide() {
        return this.#query({
            queryKey: ['AllGuid'],
            queryFn: () => this.#http.get<Array<any>>(this._urlAllGuid, this.ObterAuthHeader())
        })
    }
}