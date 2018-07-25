import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../../app/globals';

@Injectable()
export class UsersService {

  constructor(private _http: Http, private globals: Globals) { }

 
  getUserDetails(userName) {
   
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'User/GetUserDetailsByUserName?userName=' + userName, { headers: header })
      .map(res => res.json())
  }


  GetUsersList() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'User/GetUsersList', { headers: header })
      .map(res => res.json())
  }

  getRoles() {
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'User/GetRoles', { headers: header })
      .map(res => res.json())
  }

  //GetUsersByRole
  GetUsersByRole(id) {
   
    let header = this.globals.getHeaders()
    return this._http.get(this.globals.APIHOST + 'User/GetUsersByRole?id=' + id, { headers: header })
      .map(res => res.json())
  }

  createUser(user) {
    let body = user
    
    let header = this.globals.getHeaders()
    return this._http.post(this.globals.APIHOST + 'User/CreateUser', body, { headers: header })
      .map(res => res.json())
  }

}
