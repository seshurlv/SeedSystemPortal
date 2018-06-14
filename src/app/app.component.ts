import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth-service.service'

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
    private authService: AuthService) {

    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  ngOnInit() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.showPosition(position);
    //   });
    // } else {
    //   alert("Geolocation is not supported by this browser.");
    // }


    if (this.router.url == '/') {
      //console.log(this.router.url)
    }
    
    if (window.location.href == 'http://localhost:4200/#/') {
      this.clearLocalStorage()
      console.log('href ', window.location.href)
    }

    if (window.location.href == 'http://localhost:4200/') {
      this.clearLocalStorage()
      console.log('href ', window.location.href)
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/#/') {
      //console.log('ssuadmin ', window.location.href)
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/') {
      //console.log('ssuadmin ', window.location.href)
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.stage.aheadrace.com:8084/#/') {
      //console.log('ssuadmin ', window.location.href)
      this.clearLocalStorage()
    }

    if (window.location.href == 'http://ssuadmin.stage.aheadrace.com:8084/') {
      //console.log('ssuadmin ', window.location.href)
      this.clearLocalStorage()
    }


    if (JSON.parse(window.localStorage.getItem('authToken'))) {
      this.ifLogin = true;
    }

  }

  clearLocalStorage(){
    localStorage.clear()
  }

  onPageChanges(isPageChanges) {
    this.showSignup = isPageChanges
    //console.log('onPageChanges'+isPageChanges)
  }

  doSomething(isSignupChanges) {
    //console.log('doSomething'+isSignupChanges)
    this.showSignup = isSignupChanges
  }


  doLogin() {
    //console.log('dologin', this.signin.value)
      this.authService.getAccessToken(this.signInForm.value.userName, this.signInForm.value.password)
        .subscribe(acessToken => {
          //console.log('resposce ', acessToken)
          if (acessToken) {
            window.localStorage.setItem('authToken', JSON.stringify(acessToken))
            this.authService.getUserDetails(this.signInForm.value.userName)
              .subscribe(data => {
                //console.log('user details', JSON.stringify(data))
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
              //console.log('invalid password')
            }, 2000)
          }
        })
  }

}
