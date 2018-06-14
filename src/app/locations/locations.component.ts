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

  selectBoolCountry: boolean
  selectBoolRegion: boolean
  selectBoolState: boolean

  titleText
  countryForm
  stateForm
  districtForm

  states
  editBool: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', Validators.required),
      countryCode: new FormControl('', Validators.required),
      countryTelephonecode: new FormControl(''),
      countryDiscription: new FormControl('')
    })

    this.stateForm = new FormGroup({
      stateName: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
      regionId: new FormControl('', Validators.required),
      stateDescription: new FormControl (''),
      stateId: new FormControl('')
    })

    this.districtForm = new FormGroup({
      districtName: new FormControl('', Validators.required),
      stateId: new FormControl('', Validators.required),
      districtDescription: new FormControl(''),
      districtId: new FormControl('')
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
      this.getStates()
      this.getDistricts()
    }

    this.modalTitle = this.router.url.split('/')[1]
    //console.log(this.modalTitle)
  }

  getDistricts() {
    this.authService.GetDistricts().subscribe(res => {
      //console.log('GetDistricts' + JSON.stringify(res))
      this.districtsList = res
    })
  }
  getCountries() {
    this.authService.getCountries().subscribe(res => {
      //console.log('getCountries' + JSON.stringify(res))
      this.countriesList = res
    })
  }

  getRegions() {
    this.authService.getRegions().subscribe(res => {
      //console.log('getRegions' + JSON.stringify(res))
      this.regionsList = res
    })
  }

  getStates() {
    this.authService.getStates().subscribe(res => {
      //console.log('getStates' + JSON.stringify(res))
      this.statesList = res
    })
  }


  saveLocationSubmit() {
    //console.log(this.countryForm.value)
    let countryId: number

    if (this.countryForm.value.countryId) {
      countryId = this.countryForm.value.countryId
    } else {
      countryId = 0
    }
    //console.log(countryId)
    let countryObj = {
      CountryID: countryId,
      CountryCode: this.countryForm.value.countryCode,
      CountryName: this.countryForm.value.countryName,
      CountryPhoneCode: this.countryForm.value.countryTelephonecode,
      CountryDescription: this.countryForm.value.countryDiscription
    }
    //console.log(JSON.stringify(countryObj))
    //service call
    this.authService.CreateUpdateCountry(countryObj)
      .subscribe(res => {
        //console.log(res)
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
      countryDiscription : new FormControl(countryObj.CountryDescription),
      countryId: new FormControl(countryObj.CountryID)
    })
  }

  beforeEdit = {
    ctryId: '',
    regId: '',
    stateId:''
  }
  editState(stateObj) {
    this.editBool = false;
    this.titleText = 'Edit'

    console.log(JSON.stringify(stateObj))

    this.stateForm.controls['stateName'].setValue(stateObj.StateName);
    this.stateForm.controls['countryId'].setValue(stateObj.Country.CountryName);
    this.stateForm.controls['regionId'].setValue(stateObj.Region.RegionName);
    this.stateForm.controls['stateId'].setValue(stateObj.StateID);
    this.stateForm.controls['stateDescription'].setValue(stateObj.StateDescription)

    this.beforeEdit.ctryId = stateObj.Country.CountryID
    this.beforeEdit.regId = stateObj.Region.RegionID

    console.log(JSON.stringify(this.beforeEdit))
    this.states = {
      stateId: stateObj.StateID,
      countryId: stateObj.Country.CountryID,
      regionId: stateObj.Region.RegionID,
    }

    //console.log(this.stateForm.value)
    //console.log(JSON.stringify(this.states))
  }


  editDistrict(districtObj) {
    this.editBool = false;
    this.titleText = 'Edit'
    
    console.log(JSON.stringify(districtObj))
    this.beforeEdit.stateId = districtObj.State.StateID

    this.districtForm.controls['districtName'].setValue(districtObj.DistrictName)
    this.districtForm.controls['districtDescription'].setValue(districtObj.DistrictDescription)
    this.districtForm.controls['stateId'].setValue(districtObj.State.StateName)
    this.districtForm.controls['districtId'].setValue(districtObj.DistrictID)
  }

  showCountryModal() {
    this.titleText = 'Add'
  }

  saveStateSubmit(state) {
    //console.log(this.stateForm.value)
    //console.log(state)
    let stateId: number
    console.log(this.beforeEdit)
    console.log(this.selectBoolCountry)
    console.log(this.selectBoolRegion)

    if (this.stateForm.value.stateId) {
      stateId = this.stateForm.value.stateId
    } else {
      stateId = 0
    }

    let stateObj = {
      StateID: stateId,
      StateName: this.stateForm.value.stateName,
      Country: {
        CountryID: this.selectBoolCountry ? this.stateForm.value.countryId : this.beforeEdit.ctryId
      },
      Region: {
        RegionID: this.selectBoolRegion ? this.stateForm.value.regionId : this.beforeEdit.regId
      },
      StateDescription: this.stateForm.value.stateDescription
    }

    console.log(JSON.stringify(stateObj))


    //service call
    this.authService.CreateUpdateState(stateObj)
      .subscribe(res => {
        //console.log(res)
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
  }

  showDistrictModal() {
    this.titleText = 'Add'
    this.editBool = true;
  }

  selectCountry(selectedCountry) {
    //console.log(selectedCountry)
    this.selectBoolCountry = true;
  }

  selectState(selectedState) {
    //console.log(selectedState)
    this.selectBoolState = true;
  }

  selectDistrict(selectedDisrict) {
    //console.log(selectedDisrict)
  }

  selectRegion(seletedRegion) {
    //console.log(seletedRegion)
    this.selectBoolRegion = true
  }

  closeModal() {
    this.stateForm.reset()
    this.countryForm.reset()
    this.districtForm.reset()
    this.selectBoolCountry = false;
    this.selectBoolRegion = false;
    this.selectBoolState = false;
  }

  saveDistrictSubmit() {
    //console.log(this.districtForm.value)

    let districtId: number
    if (this.districtForm.value.districtId) {
      districtId = this.districtForm.value.districtId
    } else {
      districtId = 0
    }
    console.log(JSON.stringify(this.beforeEdit))

    let districtObj = {
      DistrictID: districtId,
      DistrictName: this.districtForm.value.districtName,
      DistrictDescription: this.districtForm.value.districtDescription,
      State: {
        StateId: this.selectBoolState ? this.districtForm.value.stateId : this.beforeEdit.stateId
      }
    }

    console.log(JSON.stringify(districtObj))

    this.authService.CreateUpdateDistrict(districtObj)
      .subscribe(res => {
        //console.log(res)
        this.districtForm.reset()
        this.selectBoolState = false
        this.getDistricts();
      })
  }


}
