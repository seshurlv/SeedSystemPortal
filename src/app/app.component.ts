import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth-service.service'

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  user
  form
  signin
  signup
  Farm
  Alert
  errSignUpAlert
  Role
  ifLogin = false;
  districtId
  epaId
  sectionId
  districtsArr = [];
  epaArray = []
  sectionArray = [];
  countriesArr = [];
  statesArr = [];
  regionsArr = [];
  mobnumPattern
  poBoxPattern
  emailPattern
  namePattern
  showSignup = false

  constructor(public location: Location,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {

    this.signin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
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
    //console.log('href ',window.location.href)
    if (window.location.href == 'http://localhost:4200/#/') {
      localStorage.clear()
      //console.log('href ', window.location.href)
    }

    if (window.location.href == 'http://localhost:4200/') {
      localStorage.clear()
      //console.log('href ', window.location.href)
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/#/') {
      //console.log('ssuadmin ', window.location.href)
      localStorage.clear()
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/') {
      //console.log('ssuadmin ', window.location.href)
      localStorage.clear()
    }

    if (window.location.href == 'http://ssuadmin.stage.aheadrace.com:8084/#/') {
      //console.log('ssuadmin ', window.location.href)
      localStorage.clear()
    }

    if (window.location.href == 'http://ssuadmin.stage.aheadrace.com:8084/') {
      //console.log('ssuadmin ', window.location.href)
      localStorage.clear()
    }

    //this.router.navigate([this.router.url]);

    this.Role = JSON.parse(window.localStorage.getItem('authToken'));
    if (this.Role) {
      this.ifLogin = true;
    }

  }

  onPageChanges(isPageChanges){
    this.showSignup = isPageChanges
    //console.log('onPageChanges'+isPageChanges)
  }

  doSomething(isSignupChanges){
    //console.log('doSomething'+isSignupChanges)
    this.showSignup = isSignupChanges
  }

  isMap(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }

  errMsg
  doLogin() {
    //console.log('dologin', this.signin.value)

    if (this.signin.value.userName != '' && this.signin.value.password != '') {
      this.authService.getAccessToken(this.signin.value.userName, this.signin.value.password)
        .subscribe(acessToken => {

          //console.log('resposce ', acessToken)

          if (acessToken) {
            window.localStorage.setItem('authToken', JSON.stringify(acessToken))
            this.authService.getUserDetails(this.signin.value.userName)
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
            this.errMsg = true
            this.signin.reset();

            setTimeout(() => {
              this.errMsg = false;
              //console.log('invalid password')
            }, 2000)

          }
        })
    }

  }


  
}
