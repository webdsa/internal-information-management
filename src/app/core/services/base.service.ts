import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LocalStorageUtils } from "../utils/local-storage.utils";


export abstract class BaseService {
    protected _urlBase = environment.urlApi;
    protected LocalStorage = new LocalStorageUtils();

    protected ObterAuthHeader() {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`,
                'ngrok-skip-browser-warning': '69420'
            })
        };
    }

}
