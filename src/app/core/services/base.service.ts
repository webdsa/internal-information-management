import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LocalStorageUtils } from "../utils/local-storage.utils";

export abstract class BaseService {

    protected UrlServiceV1: string = environment.urlApi;
    public LocalStorage = new LocalStorageUtils();

    protected ObterAuthHeader() {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            }),
            withCredentials: false
        };
    }
}