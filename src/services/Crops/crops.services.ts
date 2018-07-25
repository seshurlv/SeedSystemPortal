import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../../app/globals';

@Injectable()
export class CropServices {

  constructor(private _http: Http, private globals: Globals) { }

  //GetGrowersWithOpenRegistrations
  GetGrowersWithOpenRegistrations() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `User/GetGrowersWithOpenRegistrations`, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationStats
  GetRegistrationStats() {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetRegistrationStats?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationPerCrop
  GetRegistrationPerCrop() {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetRegistrationPerCrop?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetAreaPerCrop
  GetAreaPerCrop(userid, role) {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetAreaPerCrop?year=2018&userId=${userid}&role=${role}`, { headers: header })
      .map(res => res.json())
  }

  //GetUserRegistrationsPerMonth
  GetUserRegistrationsPerMonth() {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetUserRegistrationsPerMonth?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetUserPerDistrict
  GetUserPerDistrict() {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetUserPerDistrict?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetInspectedGrowersPerMonth
  GetInspectedGrowersPerMonth() {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetInspectedGrowersPerMonth?userId=3&year=2018`, { headers: header })
      .map(res => res.json())
  }


  //GetInspectorStats
  GetInspectorStats(userid, role) {

    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + `Home/GetInspectorStats?userId=${userid}&year=2018&role=${role}`, { headers: header })
      .map(res => res.json())
  }
}