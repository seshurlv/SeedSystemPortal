import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private _http: Http) { }

  getAccessToken(userName, pwd) {
   
    //let header = new Headers({ "Accept": "application/json" });
    return this._http.get(`http://ssuservices.aheadrace.com:8083/api/login/getservicetoken?username=${userName}&password=${pwd}`)
      .map(res => res.json())
  }

  getUserDetails(userName) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
   
    let header = new Headers({ 'ServiceAccessToken': token })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/User/GetUserDetailsByUserName?userName=' + userName, { headers: header })
      .map(res => res.json())
  }

  getCountries() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

   
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/getcountries', { headers: header })
      .map(res => res.json())
  }

  getStates() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/getstates', { headers: header })
      .map(res => res.json())
  }

  GetDistricts() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

   
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/GetDistricts', { headers: header })
      .map(res => res.json())
  }

  GetEPAs() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/GetEPAs', { headers: header })
      .map(res => res.json())
  }

  GetSections() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

   
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/GetSections', { headers: header })
      .map(res => res.json())
  }

  GetUsersList() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/User/GetUsersList', { headers: header })
      .map(res => res.json())
  }

  GetProductCategory() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

  
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Product/GetProductCategoryById?Id=0', { headers: header })
      .map(res => res.json())
  }

  GetProducts() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Product/GetProductsById?Id=0', { headers: header })
      .map(res => res.json())
  }

  getRoles() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));

    
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })

    return this._http.get('http://ssuservices.aheadrace.com:8083/api/User/GetRoles', { headers: header })
      .map(res => res.json())
  }


  //Get Epa By DistrictId
  getEpaByDistrictId(districtId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    // console.log(districtId)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/GetEPAByDistrictId?Id=' + districtId, { headers: header })
      .map(res => res.json())
  }

  //Get Section By EPAId
  GetSectionByEPAId(EpaId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    // console.log(EpaId)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/GetSectionByEPAId?id=' + EpaId, { headers: header })
      .map(res => res.json())
  }

  //GetUsersByRole
  GetUsersByRole(id) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get('http://ssuservices.aheadrace.com:8083/api/User/GetUsersByRole?id=' + id, { headers: header })
      .map(res => res.json())
  }

  //getRegions
  getRegions() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Location/GetRegions?Id=0', { headers: header })
      .map(res => res.json())
  }

  createUser(user) {
    let body = user
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.post('http://ssuservices.aheadrace.com:8083/api/User/CreateUser', body, { headers: header })
      .map(res => res.json())
  }

  //GetProductsByProductCategoryId
  GetProductsByProductCategoryId(Id) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Product/GetProductsByProductCategoryId?Id=' + Id, { headers: header })
      .map(res => res.json())
  }

  //ClassOfSeed
  GetProductClassList() {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get('http://ssuservices.aheadrace.com:8083/api/Product/GetProductClassList?id=0', { headers: header })
      .map(res => res.json())
  }

  //Register Inspection
  RegisterInspection(regestrationDetails) {
    let body = regestrationDetails
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.post('http://ssuservices.aheadrace.com:8083/api/Admin/RegisterInspection', body, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationsByUser
  GetRegistrationsByUser(mode, userId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get(`http://ssuservices.aheadrace.com:8083/api/Admin/GetRegistrationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }

  //AssignInspector
  AssignInspector(assignDetails) {
    let body = assignDetails;
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.post('http://ssuservices.aheadrace.com:8083/api/Admin/AssignInspector', body, { headers: header })
      .map(res => res.json())
  }

  //GetObservationsByUser
  GetObservationsByUser(mode,userId) {
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get(`http://ssuservices.aheadrace.com:8083/api/Admin/GetObservationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }

  //GetGrowersWithOpenRegistrations
  GetGrowersWithOpenRegistrations(){
    let token = JSON.parse(window.localStorage.getItem('authToken'));
    // console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get(`http://ssuservices.aheadrace.com:8083/api/User/GetGrowersWithOpenRegistrations`, { headers: header })
      .map(res => res.json())
  }
}
