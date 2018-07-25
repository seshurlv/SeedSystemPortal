import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../services/Users/users.services';
import { LoginService } from '../services/Login/login.service'
import { Globals } from './globals'

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  signInForm
  ifLogin: boolean = false;
  showSignup: boolean = false
  signInErrMsg: boolean

  constructor(public location: Location,
    private router: Router,
    private usersService: UsersService,
    private globals : Globals,
    private loginService : LoginService) {

    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  ngOnInit() {

    if (window.location.href == 'http://localhost:4200/#/') {
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://localhost:4200/') {
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/#/') {
      
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/') {
      
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.stage.aheadrace.com:8084/#/') {
     
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.stage.aheadrace.com:8084/') {
      this.clearLocalStorage()
    }

    if (this.globals.getToken()) {
      this.ifLogin = true;
    }

  }

  clearLocalStorage() {
    localStorage.clear()
  }

  onPageChanges(isPageChanges) {
    this.showSignup = isPageChanges
    
  }

  doSomething(isSignupChanges) {
    this.showSignup = isSignupChanges
  }


  doLogin() {
   
    this.loginService.getAccessToken(this.signInForm.value.userName, this.signInForm.value.password)
      .subscribe(acessToken => {
        if (acessToken) {
          window.localStorage.setItem('authToken', JSON.stringify(acessToken))
          this.usersService.getUserDetails(this.signInForm.value.userName)
            .subscribe(data => {
              window.localStorage.setItem('Role', JSON.stringify(data.Role.RoleID))
              window.localStorage.setItem('UserId', JSON.stringify(data.UserID))
              window.localStorage.setItem('username', JSON.stringify(data.UserName));
              window.localStorage.setItem('name', JSON.stringify(data.FirstName + '' + ' ' + ' ' + data.LastName))
              this.ifLogin = true;
              this.router.navigate(['/dashboard']);
            })
        } else {
          this.signInErrMsg = true
          this.signInForm.reset();

          setTimeout(() => {
            this.signInErrMsg = false;
          }, 2000)
        }
      })
  }

}
