import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class Globals {
    public STAGEAPI = 'http://ssuadmin.stage.aheadrace.com:8084/'
    public PRODAPI = 'http://ssuadmin.aheadrace.com:8082/'
    public LOCALAPI = 'http://localhost:4200/'

    public APIHOST = 'http://ssuservices.stage.aheadrace.com:8085/api/';

    getToken() {
        return JSON.parse(window.localStorage.getItem('authToken'));
    }

    getHeaders() {
        return new Headers({ 'ServiceAccessToken': this.getToken(), "Content-Type": "application/json", "Accept": "*/*" })
    }
}