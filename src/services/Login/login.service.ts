import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../../app/globals';

@Injectable()
export class LoginService {

    constructor(private _http: Http, private globals: Globals) { }
    
    getAccessToken(userName, pwd) {
        return this._http.get(this.globals.APIHOST + `login/getservicetoken?username=${userName}&password=${pwd}`)
            .map(res => res.json())
    }

}