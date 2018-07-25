import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/Users/users.services';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LocationServices } from './../../../../services/Locations/locations.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cropValidationAlert: boolean = false

  form
  user
  sectionArray = [];
  districtsArr = []
  epaArray = [];
  countriesArr = [];
  statesArr = [];
  regionsArr = [];
  mobnumPattern
  poBoxPattern
  decimalPattern
  emailPattern
  namePattern
  profilesucessAlert
  profileFailureAlert
  Farm

  userProfile
  positions: any[] = [];
  farmersCropLengthBefore: number
  
  constructor(private usersService: UsersService,
    private locationService: LocationServices) {

    this.mobnumPattern = "^((\\+91-?)|0)?[0-9]{9}$";
    this.poBoxPattern = "^[0-9_-]{3,6}$";
    this.decimalPattern = "^[0-9]+(.[0-9]{0,2})?$";
    this.emailPattern = "^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.namePattern = "^[a-zA-Z]*$"

    this.form = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])),
      middlename: new FormControl('', Validators.compose([Validators.pattern(this.namePattern)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern(this.mobnumPattern)])),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      pobox: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern(this.poBoxPattern)])),
      village: new FormControl(''),
      districts: new FormControl(''),
      epas: new FormControl(''),
      sections: new FormControl(''),
      countries: new FormControl(''),
      states: new FormControl(''),
      regions: new FormControl(''),
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
      PostalCode: '',
      AddressLine1: '',
      Address: {
        District: {
          DistrictName: ''
        },
        EPA: {
          EPAName: ''
        },
        Section: {
          SectionName: ''
        },
        Country: {
          CountryName: ''
        },
        Region: {
          RegionName: ''
        },
        State: {
          StateName: ''
        }
      }
    }

  }



  ngOnInit() {
    let username = JSON.parse(window.localStorage.getItem('username'));
    this.usersService.getUserDetails(username)
      .subscribe(res => {
        this.userProfile = res

        if (this.userProfile.FarmDetails) {
          this.farmersCropLengthBefore = this.userProfile.FarmDetails.length

          for (let i = 0; i < this.userProfile.FarmDetails.length; i++) {
            this.positions.push([this.userProfile.FarmDetails[i].FarmLattitude, this.userProfile.FarmDetails[i].FarmLongitude])

          }
        } else {

          this.userProfile.FarmDetails = []

        }

      })

    this.locationService.GetDistricts()
      .subscribe(res => {
        this.districtsArr = res
      }, error => {
      })


    this.locationService.getRegions()
      .subscribe(regionRes => {
        this.regionsArr = regionRes
      }, error => {
      })

    this.locationService.getCountries()
      .subscribe(res => {
        this.countriesArr = res
      }, error => {
      })

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

  onUpdateProfile(userProfile) {

    var user = {
      "UserID": userProfile.UserID,
      "UserName": userProfile.UserName,
      "Password": userProfile.Password,
      "FirstName": userProfile.FirstName,
      "MiddleName": userProfile.MiddleName,
      "LastName": userProfile.LastName,
      "Address": {
        "AddressLine1": userProfile.Address.AddressLine1,
        "Region": {
          "RegionID": userProfile.Address.Region.RegionID
        },
        "State": {
          "StateID": userProfile.Address.State.StateID
        },
        "Country": {
          "CountryID": userProfile.Address.Country.CountryID
        },
        "District": {
          "DistrictID": this.form.value.districts ? this.form.value.districts.DistrictID : userProfile.Address.District.DistrictID
        },
        "EPA": {
          "ID": this.form.value.epas ? this.form.value.epas.ID : userProfile.Address.EPA.ID
        },
        "Section": {
          "ID": this.form.value.sections ? this.form.value.sections.ID : userProfile.Address.Section.ID
        },
        "PostalCode": userProfile.Address.PostalCode
      },
      "Role": {
        "RoleId": userProfile.Role.RoleID
      },
      "Email": userProfile.Email,
      "MobileNumber": userProfile.MobileNumber,
      "FarmDetails": this.userProfile.FarmDetails
    }

    this.usersService.createUser(user)
      .subscribe(res => {

        if (res == 1) {
          this.profilesucessAlert = true;

          setTimeout(() => {
            this.profilesucessAlert = false;
          }, 5000)

        } else {
          this.profileFailureAlert = true;
          setTimeout(() => {
            this.profileFailureAlert = false;
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

  lat = 17.4233564;
  long = 78.33927729999999;

  onClick(event) {

    var tempLat = event.latLng.lat();
    var tempLng = event.latLng.lng();

    if (this.Farm.valid) {
      if (this.userProfile.FarmDetails.length == this.positions.length) {
        if (event instanceof MouseEvent) return;
        this.positions.push([tempLat, tempLng]);
        event.target.panTo(event.latLng);

      }
    } else {

      this.cropValidationAlert = true;

      setTimeout(() => {
        this.cropValidationAlert = false;
      }, 3000)
    }

  }

  posi
  farmAddressArr = []
  saveLocation() {

    this.positions.filter((pos) => {
      this.posi = pos
    })

    if (this.posi) {
      this.userProfile.FarmDetails.push({
        Id: 0,
        FarmTitle: this.Farm.value.FarmTitle,
        FarmAddress: this.Farm.value.FarmAddress,
        FarmContact: this.Farm.value.FarmContact,
        FarmLattitude: this.posi[0],
        FarmLongitude: this.posi[1],
        FarmImageURL: ""
      })

      this.Farm.reset()
    }
  }

  marker = {
    display: true,
    lat: null,
    lng: null,
  };

  clicked({ target: marker }) {
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  removeMarker(marker) {
    for (var i = 0; i < this.positions.length; i++) {

      if (JSON.stringify(marker.lat) == this.positions[i][0]) {

        this.positions.splice(i, 1)
        this.userProfile.FarmDetails.splice(i, 1)
      }
    }
  }

  farmsCount: number;
  removeMarkerFromTable(lat) {

    this.farmsCount = this.userProfile.FarmDetails.length;

    for (var i = 0; i < this.positions.length; i++) {
      if (lat == this.positions[i][0]) {
        this.positions.splice(i, 1)
        this.userProfile.FarmDetails.splice(i, 1)
      }
    }
  }

  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }
}
