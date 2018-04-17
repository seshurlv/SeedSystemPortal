import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(public location: Location,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {

    this.signin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signup = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      pobox: ['', Validators.required],
      village: ['', Validators.required],
      districts: ['', Validators.required],
      epas: ['', Validators.required],
      sections: ['', Validators.required],
      countries: ['', Validators.required],
      states: ['', Validators.required],
      regions: ['', Validators.required]
    });

    this.user = {
      FirstName: '',
      LastName: '',
      Email: '',
      Mobile: '',
      UserName: '',
      Password: '',
      Address: '',
      Pobox: '',
      Village: '',
      FarmContact: '',
      districtId: '',
      epaId: '',
      sectionId: ''
    }
  }

  ngOnInit() {


    if (this.router.url == '/') {
      console.log(this.router.url)
    }
    //console.log('href ',window.location.href)
    if (window.location.href == 'http://localhost:4200/#/') {
      localStorage.clear()
      console.log('href ', window.location.href)
    }

    if (window.location.href == 'http://localhost:4200/') {
      localStorage.clear()
      console.log('href ', window.location.href)
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/#/') {
      console.log('ssuadmin ', window.location.href)
      localStorage.clear()
    }

    if (window.location.href == 'http://ssuadmin.aheadrace.com:8082/') {
      console.log('ssuadmin ', window.location.href)
      localStorage.clear()
    }

    //this.router.navigate([this.router.url]);


    this.Role = JSON.parse(window.localStorage.getItem('authToken'));
    if (this.Role) {
      this.ifLogin = true;
    } else {
      
      this.authService.GetDistricts()
      .subscribe(res => {
        console.log(JSON.stringify(res))
        this.districtsArr = res
        if(res){
          this.authService.getCountries()
          .subscribe(res => {
            this.countriesArr = res
            console.log(JSON.stringify(res))
            if (res) {
              this.authService.getStates()
                .subscribe(res => {
                  this.statesArr = res
                  console.log(JSON.stringify(res))
                  if (res) {
                    this.authService.getRegions()
                      .subscribe(res => {
                        this.regionsArr = res
                        console.log(JSON.stringify(res))
                      })
                  }
                })
            }
          })
        }
      })

    }



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

          console.log('resposce ', acessToken)

          if (acessToken) {
            window.localStorage.setItem('authToken', JSON.stringify(acessToken))
            this.authService.getUserDetails(this.signin.value.userName)
              .subscribe(data => {
                console.log('user details', JSON.stringify(data))
                window.localStorage.setItem('Role', JSON.stringify(data.Role.RoleID))
                window.localStorage.setItem('UserId', JSON.stringify(data.UserID))
                window.localStorage.setItem('username', JSON.stringify(data.UserName));
                window.localStorage.setItem('name', JSON.stringify(data.FirstName + '' +' ' + ' '+ data.LastName))
                this.ifLogin = true;
                this.router.navigate(['/dashboard']);
              })
          } else {
            this.errMsg = true
            this.signin.reset();

            setTimeout(() => {
              this.errMsg = false;
              console.log('invalid password')
            }, 2000)

          }
        })
    }

  }


  forgotPwd() {
    // console.log('forgotPwd')
  }
  showSignup = false

  selectDistrict(discrict) {
    // console.log(discrict)
    // console.log(this.districtId)

    this.authService.getEpaByDistrictId(discrict.DistrictID)
      .subscribe(res => {
        this.epaArray = res
        //console.log(this.epaArray)
      })
  }

  selectEpa(epa) {
    console.log(epa)
    console.log(this.epaId)

    this.authService.GetSectionByEPAId(epa.ID)
      .subscribe(res => {
        this.sectionArray = res
        console.log(this.sectionArray)
      })
  }

  selectSection(sectionId) {
    console.log(sectionId)
    console.log(this.sectionId)
  }

  onRegister() {
    console.log('onRegister', this.signup.value)
    let formObj = this.signup.value


    var user = {
      Role: {
        RoleID: 4
      },
      FirstName: formObj.firstname,
      MiddleName: formObj.middlename,
      LastName: formObj.lastname,
      Email: formObj.email,
      MobileNumber: formObj.mobile,
      UserName: formObj.username,
      Password: formObj.password,

      Address: {
        AddressLine1: formObj.village,
        Region: {
          RegionID: formObj.regions.RegionID
        },
        State: {
          StateID: formObj.states.StateID
        },
        Country: {
          CountryID: formObj.countries.CountryID
        },
        District: {
          DistrictID: formObj.districts.DistrictID
        },
        EPA: {
          ID: formObj.epas.ID
        },
        Section: {
          ID: formObj.sections.ID
        },
        PostalCode: formObj.pobox
      }

    }


    let FarmDetails = 'FarmDetails'
    //let FarmAddress = 'FarmAddress' 

    user[FarmDetails] = {
      FarmAddress: '',
      FarmContact: ''
    }


    console.log(JSON.stringify(user))
    this.authService.createUser(user)
      .subscribe(res => {
        console.log(JSON.stringify(res))
        if (res == 1) {
          this.showSignup = false;
          this.Alert = true
        } else {
          this.errSignUpAlert = true
        }
      })


  }
  selectCountry() {

  }

  selectState() {

  }

  selectRegion() {

  }

}
