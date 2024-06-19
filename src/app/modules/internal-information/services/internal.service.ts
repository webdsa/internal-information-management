import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../core/services/base.service';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';


@Injectable({
    providedIn: 'root',
})
export class InternalService extends BaseService {
    private _urlBase = environment.urlApi;
    private _urlGuid = `${this._urlBase}/guide/topic`;
    private _urlAllGuid = `${this._urlBase}/guide/topic/all`;
    private _urlSubTopic = `${this._urlBase}/guide/subtopic`;


    #http = inject(HttpClient);
    #query = injectQuery();
    #mutation = injectMutation();
    #client = injectQueryClient();

    constructor() { super(); }


    public getAllGuide() {
        return this.#query({
            queryKey: ['AllGuid'],
            queryFn: () => this.#http.get<Array<any>>(this._urlAllGuid, this.ObterAuthHeader())
        })
    }

    public createTopic(topic: any) {
        return this.#mutation({
            mutationFn: () => this.#http.post(this._urlGuid, topic, this.ObterAuthHeader()),
            onSuccess: () => {
                this.#client.invalidateQueries({ queryKey: ['AllGuid'] });
            }
        });
    }
    public createSubTopic(subTopic: any) {
        return this.#mutation({
            mutationFn: () => this.#http.post(this._urlSubTopic, subTopic, this.ObterAuthHeader()),
            onSuccess: () => {
                this.#client.invalidateQueries({ queryKey: ['AllGuid'] });
            }
        });
    }
}