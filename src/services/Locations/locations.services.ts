import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../../app/globals';

@Injectable()
export class LocationServices {

  constructor(private _http: Http, private globals: Globals) { }


  getCountries() {
   
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/getcountries', { headers: header })
      .map(res => res.json())
  }

  getStates() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/getstates', { headers: header })
      .map(res => res.json())
  }

  GetDistricts() {
   let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetDistricts', { headers: header })
      .map(res => res.json())
  }

  GetEPAs() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetEPAs', { headers: header })
      .map(res => res.json())
  }

  GetSections() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetSections', { headers: header })
      .map(res => res.json())
  }

  //Get Epa By DistrictId
  GetStatesByCountryId(countryId) {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetStatesByCountryId?countryId=' + countryId, { headers: header })
      .map(res => res.json())
  }


  //Get Epa By DistrictId
  getEpaByDistrictId(districtId) {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetEPAByDistrictId?id=' + districtId, { headers: header })
      .map(res => res.json())
  }

  //Get Section By EPAId
  GetSectionByEPAId(EpaId) {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetSectionByEPAId?id=' + EpaId, { headers: header })
      .map(res => res.json())
  }



  //getRegions
  getRegions() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'Location/GetRegions?id=0', { headers: header })
      .map(res => res.json())
  }

  //CreateUpdateCountry
  CreateUpdateCountry(locationBodyDetails) {
    let body = locationBodyDetails;
    let header = this.globals.getHeaders()
    return this._http.post(this.globals.APIHOST + 'Location/CreateUpdateCountry', body, { headers: header })
      .map(res => res.json())
  }

  //CreateUpdateState
  CreateUpdateState(locationBodyDetails) {
    let body = locationBodyDetails;
    let header = this.globals.getHeaders()
    return this._http.post(this.globals.APIHOST + 'Location/CreateUpdateState', body, { headers: header })
      .map(res => res.json())
  }

  //CreateUpdateDistrict
  CreateUpdateDistrict(locationBodyDetails) {
    let body = locationBodyDetails;
    let header = this.globals.getHeaders()
    return this._http.post(this.globals.APIHOST + 'Location/CreateUpdateDistrict', body, { headers: header })
      .map(res => res.json())
  }

}