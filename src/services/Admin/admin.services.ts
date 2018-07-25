import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../../app/globals';

@Injectable()
export class AdminServices {

    constructor(private _http: Http,private globals: Globals) { }


  //Register Inspection
  RegisterInspection(regestrationDetails) {
    let body = regestrationDetails
  
    let header = this.globals.getHeaders()
    return this._http.post(this.globals.APIHOST + 'Admin/RegisterInspection', body, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationsByUser
  GetRegistrationsByUser(mode, userId) {
   
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Admin/GetRegistrationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }

  //AssignInspector
  AssignInspector(assignDetails) {
    let body = assignDetails;
   
    let header = this.globals.getHeaders()
    return this._http.post(this.globals.APIHOST + 'Admin/AssignInspector', body, { headers: header })
      .map(res => res.json())
  }

  //GetObservationsByUser
  GetObservationsByUser(mode, userId) {
    
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Admin/GetObservationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }

  GetObservationsByRegId(regId) {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Admin/GetObservationsByRegId?regId=${regId}`, { headers: header })
      .map(res => res.json())
  }
  
}