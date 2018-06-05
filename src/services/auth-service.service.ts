import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public APIHOST = 'http://ssuservices.stage.aheadrace.com:8085/api/';
  //public APIHOST = 'http://ssuservices.aheadrace.com:8083/api/';
  constructor(private _http: Http) { }

  getAccessToken(userName, pwd) {

    //let header = new Headers({ "Accept": "application/json" });
    return this._http.get(this.APIHOST + `login/getservicetoken?username=${userName}&password=${pwd}`)
      .map(res => res.json())
  }

  getUserDetails(userName) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    let header = new Headers({ 'ServiceAccessToken': token, "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'User/GetUserDetailsByUserName?userName=' + userName, { headers: header })
      .map(res => res.json())
  }

  getCountries() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    console.log(token)
    return this._http.get(this.APIHOST + 'Location/getcountries', { headers: header })
      .map(res => res.json())
  }

  getStates() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'Location/getstates', { headers: header })
      .map(res => res.json())
  }

  GetDistricts() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'Location/GetDistricts', { headers: header })
      .map(res => res.json())
  }

  GetEPAs() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));


    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'Location/GetEPAs', { headers: header })
      .map(res => res.json())
  }

  GetSections() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));


    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'Location/GetSections', { headers: header })
      .map(res => res.json())
  }

  GetUsersList() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));


    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'User/GetUsersList', { headers: header })
      .map(res => res.json())
  }

  GetProductCategory() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));


    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'Product/GetProductCategoryById?id=0', { headers: header })
      .map(res => res.json())
  }

  GetProducts() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));


    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'Product/GetProductsById?id=0', { headers: header })
      .map(res => res.json())
  }

  getRoles() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));


    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })

    return this._http.get(this.APIHOST + 'User/GetRoles', { headers: header })
      .map(res => res.json())
  }

   //Get Epa By DistrictId
   GetStatesByCountryId(countryId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    // console.log(districtId)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'Location/GetStatesByCountryId?countryId=' + countryId, { headers: header })
      .map(res => res.json())
  }


  //Get Epa By DistrictId
  getEpaByDistrictId(districtId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    // console.log(districtId)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'Location/GetEPAByDistrictId?id=' + districtId, { headers: header })
      .map(res => res.json())
  }

  //Get Section By EPAId
  GetSectionByEPAId(EpaId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    // console.log(EpaId)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'Location/GetSectionByEPAId?id=' + EpaId, { headers: header })
      .map(res => res.json())
  }

  //GetUsersByRole
  GetUsersByRole(id) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'User/GetUsersByRole?id=' + id, { headers: header })
      .map(res => res.json())
  }

  //getRegions
  getRegions() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'Location/GetRegions?id=0', { headers: header })
      .map(res => res.json())
  }

  createUser(user) {
    let body = user
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.post(this.APIHOST + 'User/CreateUser', body, { headers: header })
      .map(res => res.json())
  }

  //GetProductsByProductCategoryId
  GetProductsByProductCategoryId(Id) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'Product/GetProductsByProductCategoryId?id=' + Id, { headers: header })
      .map(res => res.json())
  }

  //ClassOfSeed
  GetProductClassList() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + 'Product/GetProductClassList?id=0', { headers: header })
      .map(res => res.json())
  }

  //Register Inspection
  RegisterInspection(regestrationDetails) {
    let body = regestrationDetails
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.post(this.APIHOST + 'Admin/RegisterInspection', body, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationsByUser
  GetRegistrationsByUser(mode, userId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Admin/GetRegistrationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }

  //AssignInspector
  AssignInspector(assignDetails) {
    let body = assignDetails;
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.post(this.APIHOST + 'Admin/AssignInspector', body, { headers: header })
      .map(res => res.json())
  }

  //GetObservationsByUser
  GetObservationsByUser(mode, userId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Admin/GetObservationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }

  //GetGrowersWithOpenRegistrations
  GetGrowersWithOpenRegistrations() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `User/GetGrowersWithOpenRegistrations`, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationStats
  GetRegistrationStats() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetRegistrationStats?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationPerCrop
  GetRegistrationPerCrop() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetRegistrationPerCrop?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetAreaPerCrop
  GetAreaPerCrop(userid, role) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetAreaPerCrop?year=2018&userId=${userid}&role=${role}`, { headers: header })
      .map(res => res.json())
  }

  //GetUserRegistrationsPerMonth
  GetUserRegistrationsPerMonth() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetUserRegistrationsPerMonth?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetUserPerDistrict
  GetUserPerDistrict() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetUserPerDistrict?year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetInspectedGrowersPerMonth
  GetInspectedGrowersPerMonth() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetInspectedGrowersPerMonth?userId=3&year=2018`, { headers: header })
      .map(res => res.json())
  }


  //GetInspectorStats
  GetInspectorStats(userid, role) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Home/GetInspectorStats?userId=${userid}&year=2018&role=${role}`, { headers: header })
      .map(res => res.json())
  }

  // UpdateUser(updatedUser){
  //   let body = updatedUser;
  //   let token = JSON.parse(window.localStorage.getItem('authToken'));
  //    console.log(updatedUser)
  //   let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" , "Accept":"*/*"})
  //   return this._http.post(this.APIHOST +'User/UpdateUser', body, { headers: header })
  //     .map(res => res.json())
  // }

  GetObservationsByRegId(regId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST + `Admin/GetObservationsByRegId?regId=${regId}`, { headers: header })
      .map(res => res.json())
  }

  //CreateUpdateCountry
  CreateUpdateCountry(locationBodyDetails) {
    let body = locationBodyDetails;
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.post(this.APIHOST + 'Location/CreateUpdateCountry', body, { headers: header })
      .map(res => res.json())
  }

 //CreateUpdateState
 CreateUpdateState(locationBodyDetails) {
  let body = locationBodyDetails;
  let token = JSON.parse(window.localStorage.getItem('authToken'));
  // console.log(token)
  let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
  return this._http.post(this.APIHOST + 'Location/CreateUpdateState', body, { headers: header })
    .map(res => res.json())
}

 //CreateUpdateDistrict
 CreateUpdateDistrict(locationBodyDetails) {
  let body = locationBodyDetails;
  let token = JSON.parse(window.localStorage.getItem('authToken'));
  // console.log(token)
  let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
  return this._http.post(this.APIHOST + 'Location/CreateUpdateDistrict', body, { headers: header })
    .map(res => res.json())
}

}
