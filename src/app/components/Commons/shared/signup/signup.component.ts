import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from './../../../../../services/Users/users.services';
import { LocationServices } from './../../../../../services/Locations/locations.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() showSignup: boolean = false
  @Input() userRole
  @Input() pageBool
  @Output() changee = new EventEmitter()
  @Output() signUpChange = new EventEmitter()

  RegsucessAlert: boolean = false
  RegfailureAlert: boolean = false
  cropValidationAlert: boolean = false

  mobnumPattern
  poBoxPattern
  emailPattern
  namePattern
  signup
  Farm
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
  Alert
  errSignUpAlert
  user

  constructor(private router: Router,
    private usersService: UsersService,
    private locationService: LocationServices) {

    this.mobnumPattern = "^((\\+91-?)|0)?[0-9]{9}$";
    this.poBoxPattern = "^[0-9_-]{3,6}$";
    this.emailPattern = "^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.namePattern = "^[a-zA-Z]*$"

    this.signup = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])),
      middlename: new FormControl('', Validators.compose([Validators.pattern(this.namePattern)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern(this.mobnumPattern)])),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      pobox: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern(this.poBoxPattern)])),
      village: new FormControl('', Validators.required),
      districts: new FormControl('', Validators.required),
      epas: new FormControl('', Validators.required),
      sections: new FormControl('', Validators.required),
      countries: new FormControl('', Validators.required),
      states: new FormControl('', Validators.required),
      regions: new FormControl('', Validators.required),
      FarmContact: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.pattern(this.mobnumPattern)])),
      FarmAddress: new FormControl('')
    })

    this.Farm = new FormGroup({
      FarmContact: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(this.mobnumPattern)])),
      FarmAddress: new FormControl('', Validators.required),
      FarmTitle: new FormControl('', Validators.required)
    })

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
    this.Role = JSON.parse(window.localStorage.getItem('Role'));
    if (this.Role) {
      this.ifLogin = true;
    } else {
      this.Role = 4;

      this.locationService.getRegions()
        .subscribe(res => {
          this.regionsArr = res
        })

      this.locationService.GetDistricts()
        .subscribe(res => {
          this.districtsArr = res
          if (res) {
            this.locationService.getCountries()
              .subscribe(res => {
                this.countriesArr = res
              })
          }
        })
    }
  }

  isShowSignup() {
    this.showSignup = !this.showSignup
    this.changee.emit(this.showSignup);
  }

  selectDistrict(discrict) {

    this.locationService.getEpaByDistrictId(discrict.DistrictID)
      .subscribe(res => {
        this.epaArray = res
      })
  }

  selectEpa(epa) {

    this.locationService.GetSectionByEPAId(epa.ID)
      .subscribe(res => {
        this.sectionArray = res
      })
  }


  onRegister() {

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
      },
      FarmDetails: {
        FarmAddress: formObj.FarmAddress,
        FarmContact: formObj.FarmContact
      }

    }


    this.usersService.createUser(user)
      .subscribe(res => {
        if (res == 1) {
          this.showSignup = false;
          //publish an event
          this.signUpChange.emit(this.showSignup)

          this.signup.reset();
          this.RegsucessAlert = true;

          setTimeout(() => {
            this.RegsucessAlert = false;
          }, 5000)

        } else {

          this.RegfailureAlert = true
          setTimeout(() => {
            this.RegfailureAlert = false;
          }, 5000)
        }

      })


  }

  selectCountry(country) {

    this.locationService.GetStatesByCountryId(country.CountryID)
      .subscribe(res => {
        this.statesArr = res
      })
  }

  marker = {
    display: true,
    lat: null,
    lng: null,
  };

  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }

  lat = 17.4233564;
  long = 78.33927729999999;

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude
  }

  posi
  farmAddressArr = []
  saveLocation() {

    this.positions.filter((pos) => {
      this.posi = JSON.stringify(pos)
    })
    if (this.posi) {
      this.farmAddressArr.push({
        FarmTitle: this.Farm.value.FarmTitle,
        FarmAddress: this.Farm.value.FarmAddress,
        FarmContact: this.Farm.value.FarmContact,
        Latlng: JSON.parse(this.posi)
      })
      this.Farm.reset()
    }
  }

  positions: any[] = [];
  onClick(event) {

    if (this.Farm.valid) {
      if (this.farmAddressArr.length == this.positions.length) {
        if (event instanceof MouseEvent) return;
        this.positions.push(event.latLng);
        event.target.panTo(event.latLng);
      } else {
        this.cropValidationAlert = true;

        setTimeout(() => {
          this.cropValidationAlert = false;
        }, 3000)
      }
    }
  }

  clicked({ target: marker }) {
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  removeMarker(marker) {
    for (var i = 0; i < this.positions.length; i++) {
      this.posi = JSON.stringify(this.positions[i])
      let position = JSON.parse(this.posi)
      if (position.lat == JSON.stringify(marker.lat)) {
        this.positions.splice(i, 1)
        this.farmAddressArr.splice(i, 1)
      }
    }
  }

}
