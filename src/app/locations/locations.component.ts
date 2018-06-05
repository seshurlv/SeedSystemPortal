import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  countriesList = []
  statesList = []
  districtsList = []
  regionsList = []
  modalTitle

  countryForm
  stateForm
  districtForm

  states
  editBool: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', Validators.required),
      countryCode: new FormControl('', Validators.required),
      countryTelephonecode: new FormControl('')
    })

    this.stateForm = new FormGroup({
      stateName: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
      regionId: new FormControl('', Validators.required),
      stateId:new FormControl('')
    })

    this.districtForm = new FormGroup({
      districtName: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
    })

    this.states = {
      stateName: '',
      countryName: '',
      regionName: ''
    }
  }

  ngOnInit() {
    //console.log(this.router.url)
    if (this.router.url == '/country') {
      this.getCountries();
    }

    if (this.router.url == '/state') {
      this.getCountries()
      this.getRegions()
      this.getStates()
    }

    if (this.router.url == '/district') {
      this.authService.GetDistricts().subscribe(res => {
        //console.log('GetDistricts' + JSON.stringify(res))
        this.districtsList = res
      })
    }

    this.modalTitle = this.router.url.split('/')[1]
    //console.log(this.modalTitle)
  }

  getCountries() {
    this.authService.getCountries().subscribe(res => {
      console.log('getCountries' + JSON.stringify(res))
      this.countriesList = res
    })
  }

  getRegions() {
    this.authService.getRegions().subscribe(res => {
      console.log('getRegions' + JSON.stringify(res))
      this.regionsList = res
    })
  }

  getStates() {
    this.authService.getStates().subscribe(res => {
      console.log('getStates' + JSON.stringify(res))
      this.statesList = res
    })
  }


  saveLocationSubmit() {
    console.log(this.countryForm.value)
    let countryId: number

    if (this.countryForm.value.countryId) {
      countryId = this.countryForm.value.countryId
    } else {
      countryId = 0
    }
    console.log(countryId)
    let countryObj = {
      CountryID: countryId,
      CountryCode: this.countryForm.value.countryCode,
      CountryName: this.countryForm.value.countryName,
      CountryPhoneCode: this.countryForm.value.countryTelephonecode,
    }
    console.log(JSON.stringify(countryObj))
    //service call
    this.authService.CreateUpdateCountry(countryObj)
      .subscribe(res => {
        console.log(res)
        this.getCountries();
        this.countryForm.reset()
      })
  }

  editCountry(countryObj) {
    console.log(countryObj)
    this.titleText = 'Edit'
    this.countryForm = new FormGroup({
      countryName: new FormControl(countryObj.CountryName, Validators.required),
      countryCode: new FormControl(countryObj.CountryCode, Validators.required),
      countryTelephonecode: new FormControl(countryObj.CountryPhoneCode),
      countryId: new FormControl(countryObj.CountryID)
    })
  }

  selectedLevel
  editState(stateObj) {
    this.editBool = false;
    this.titleText = 'Edit'

    console.log(JSON.stringify(stateObj))
    // this.stateForm = new FormGroup({
    //   stateName: new FormControl(stateObj.StateName, Validators.required),
    //   countryId: new FormControl(stateObj.Country.CountryName, Validators.required),
    //   regionId: new FormControl(stateObj.Region.RegionName),
    //   stateId: new FormControl(stateObj.StateID)
    // })
    this.stateForm.controls['stateName'].setValue(stateObj.StateName);
    this.stateForm.controls['countryId'].setValue(stateObj.Country.CountryName);
    this.stateForm.controls['regionId'].setValue(stateObj.Region.RegionName);
    this.stateForm.controls['stateId'].setValue(stateObj.StateID);

    //this.stateForm.value.countryId = stateObj.Country.CountryName
    // this.stateForm = new FormGroup({
    //   countries: new FormControl(stateObj),
    // });

    this.states = {
      stateId: stateObj.StateID,
      countryId: stateObj.Country.CountryID,
      regionId: stateObj.Region.RegionID,
    }

    console.log(this.stateForm.value)
    console.log(JSON.stringify(this.states))
  }


  selectBoolCountry:boolean
  selectBoolRegion: boolean
  isNumber(val,bool){
    console.log(bool)
    this.selectBoolCountry = false;
    return this.selectBoolCountry  
    
    // if(typeof val === 'number'){
    //   return true
    // }else{
    //   return false
    // }
    //return typeof val === 'number'; 
  }

  titleText
  showCountryModal() {
    this.titleText = 'Add'
  }

  saveStateSubmit(state) {
    console.log(this.stateForm.value)
    console.log(state)
    let stateId: number
    console.log(this.editBool)

    if (this.stateForm.value.stateId) {
      stateId = this.stateForm.value.stateId
    } else {
      stateId = 0
    }

    let stateObj = {
      StateID: stateId,
      StateName: this.stateForm.value.stateName,
      Country: {
        CountryID: this.stateForm.value.countryId
      },
      Region: {
        RegionID: this.stateForm.value.regionId
      }
    }

    console.log(JSON.stringify(stateObj))

   
    //service call
    this.authService.CreateUpdateState(stateObj)
      .subscribe(res => {
        console.log(res)
        this.getStates();
        this.selectBoolCountry = false;
        this.selectBoolRegion = false;
        this.stateForm.reset()
      })

  }

  showStateModal() {
    this.titleText = 'Add'
    this.editBool = true;
    this.states = {
      stateName: '',
      countryName: ''
    }
    //console.log('showStateModal')
  }

  showDistrictModal() {
    //console.log('showDistrictModal')
  }

  selectCountry(selectedCountry) {
    console.log(selectedCountry)
    this.selectBoolCountry = true;
  }

  selectState(selectedState) {
    //console.log(selectedState)
    
  }

  selectDistrict(selectedDisrict) {
    //console.log(selectedDisrict)
  }

  selectRegion(seletedRegion) {
    console.log(seletedRegion)
    this.selectBoolRegion = true
  }

  closeModal() {
    this.stateForm.reset()
    this.countryForm.reset()
    this.selectBoolCountry = false;
    this.selectBoolRegion = false;
  }
}
