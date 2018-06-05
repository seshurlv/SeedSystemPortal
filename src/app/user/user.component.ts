import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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

  constructor(private authService: AuthService, private fb: FormBuilder, ) {
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

    //console.log(this.form)
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


  userProfile
  positions: any[] = [];
  farmersCropLengthBefore: number
  ngOnInit() {
    let username = JSON.parse(window.localStorage.getItem('username'));
    //console.log(username)
    this.authService.getUserDetails(username)
      .subscribe(res => {
        //console.log(JSON.stringify(res))
        this.userProfile = res

        if (this.userProfile.FarmDetails) {
          this.farmersCropLengthBefore = this.userProfile.FarmDetails.length

          for (let i = 0; i < this.userProfile.FarmDetails.length; i++) {
            this.positions.push([this.userProfile.FarmDetails[i].FarmLattitude, this.userProfile.FarmDetails[i].FarmLongitude])

          }
        } else {

          this.userProfile.FarmDetails = []

          console.log(this.userProfile.FarmDetails)
        }

      })

    this.authService.GetDistricts()
      .subscribe(res => {
        //console.log('Get Districts API ' + JSON.stringify(res))
        this.districtsArr = res
      }, error => {
        //console.log('Get Districts ERR API ', error)
      })


    this.authService.getRegions()
      .subscribe(regionRes => {
        this.regionsArr = regionRes
        //console.log('get States API ' + JSON.stringify(this.regionsArr))
      }, error => {
        //console.log('get Regions ERR API ', error)
      })

    this.authService.getCountries()
      .subscribe(res => {
        this.countriesArr = res
        // console.log('get Countries API ' + JSON.stringify(this.countriesArr))
      }, error => {

        console.log('Get Countries ERR API ', error)
      })

  }

  selectDistrict(discrict) {
    console.log(discrict)

    this.authService.getEpaByDistrictId(discrict.DistrictID)
      .subscribe(res => {
        this.epaArray = res
        //console.log(this.epaArray)
      })

  }

  selectEpa(epa) {
    console.log(JSON.stringify(epa))
    this.authService.GetSectionByEPAId(epa.ID)
      .subscribe(res => {
        this.sectionArray = res
        console.log(this.sectionArray)
      })
  }

  onUpdateProfile(userProfile) {
    console.log(this.form.value)
    console.log(this.form.value.districts)
    console.log(this.userProfile.FarmDetails)

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
    console.log(JSON.stringify(user))

    this.authService.createUser(user)
      .subscribe(res => {
        //console.log(res)
        if (res == 1) {
          this.profilesucessAlert = true;

          setTimeout(() => {
            this.profilesucessAlert = false;
            //console.log('profilesucessAlert')
          }, 5000)

        } else {
          this.profileFailureAlert = true;
          setTimeout(() => {
            this.profileFailureAlert = false;
            //console.log('profilesucessAlert')
          }, 5000)
        }
      })
  }

  selectCountry(country) {
    console.log(country)
    this.authService.GetStatesByCountryId(country.CountryID)
      .subscribe(res => {
        console.log(res)
        this.statesArr = res
      })
  }

  selectState() {

  }

  selectRegion() {

  }
  lat = 17.4233564;
  long = 78.33927729999999;

  onClick(event) {
    //console.log(this.positions.length)
    //console.log(this.userProfile.FarmDetails.length)

    var tempLat = event.latLng.lat();
    var tempLng = event.latLng.lng();

    if (this.Farm.valid) {
      if (this.userProfile.FarmDetails.length == this.positions.length) {
        if (event instanceof MouseEvent) return;
        this.positions.push([tempLat, tempLng]);
        event.target.panTo(event.latLng);
        //console.log('if' + JSON.stringify(this.positions))
      }
    } else {
      //console.log('else ' + JSON.stringify(this.positions))
      this.cropValidationAlert = true;

      setTimeout(() => {
        this.cropValidationAlert = false;
        //console.log('cropValidationAlert')
      }, 3000)
    }

  }

  posi
  farmAddressArr = []
  saveLocation() {
    //console.log(JSON.stringify(this.Farm.value))
    //console.log(JSON.stringify(this.positions))

    this.positions.filter((pos) => {
      //console.log(pos)
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
      //console.log(JSON.stringify(this.userProfile.FarmDetails))
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
    //console.log(JSON.stringify(marker.lat))
    for (var i = 0; i < this.positions.length; i++) {

      // this.posi = JSON.stringify(this.positions[i])
      // let test = JSON.parse(this.posi)
      //console.log(this.positions[i][0])

      if (JSON.stringify(marker.lat) == this.positions[i][0]) {

        this.positions.splice(i, 1)
        this.userProfile.FarmDetails.splice(i, 1)
      }
    }
  }

  farmsCount: number;
  removeMarkerFromTable(lat) {
    //console.log(lat)
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
