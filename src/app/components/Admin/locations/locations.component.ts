import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocationServices } from './../../../../services/Locations/locations.services';

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

  constructor(private router: Router,private locationService: LocationServices) {
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
   
  }

  getDistricts() {
    this.locationService.GetDistricts().subscribe(res => {
     
      this.districtsList = res
    })
  }
  getCountries() {
    this.locationService.getCountries().subscribe(res => {
    
      this.countriesList = res
    })
  }

  getRegions() {
    this.locationService.getRegions().subscribe(res => {
     
      this.regionsList = res
    })
  }

  getStates() {
    this.locationService.getStates().subscribe(res => {
    
      this.statesList = res
    })
  }


  saveLocationSubmit() {
    
    let countryId: number

    if (this.countryForm.value.countryId) {
      countryId = this.countryForm.value.countryId
    } else {
      countryId = 0
    }
    
    let countryObj = {
      CountryID: countryId,
      CountryCode: this.countryForm.value.countryCode,
      CountryName: this.countryForm.value.countryName,
      CountryPhoneCode: this.countryForm.value.countryTelephonecode,
      CountryDescription: this.countryForm.value.countryDiscription
    }
   
    //service call
    this.locationService.CreateUpdateCountry(countryObj)
      .subscribe(res => {
        this.getCountries();
        this.countryForm.reset()
      })
  }

  editCountry(countryObj) {
       
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

    this.stateForm.controls['stateName'].setValue(stateObj.StateName);
    this.stateForm.controls['countryId'].setValue(stateObj.Country.CountryName);
    this.stateForm.controls['regionId'].setValue(stateObj.Region.RegionName);
    this.stateForm.controls['stateId'].setValue(stateObj.StateID);
    this.stateForm.controls['stateDescription'].setValue(stateObj.StateDescription)

    this.beforeEdit.ctryId = stateObj.Country.CountryID
    this.beforeEdit.regId = stateObj.Region.RegionID

    this.states = {
      stateId: stateObj.StateID,
      countryId: stateObj.Country.CountryID,
      regionId: stateObj.Region.RegionID,
    }

  }


  editDistrict(districtObj) {
    this.editBool = false;
    this.titleText = 'Edit'
    
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
   
    let stateId: number
    

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



    //service call
    this.locationService.CreateUpdateState(stateObj)
      .subscribe(res => {
       
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
    
    this.selectBoolCountry = true;
  }

  selectState(selectedState) {
   
    this.selectBoolState = true;
  }


  selectRegion(seletedRegion) {
    
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
   

    let districtId: number
    if (this.districtForm.value.districtId) {
      districtId = this.districtForm.value.districtId
    } else {
      districtId = 0
    }
    

    let districtObj = {
      DistrictID: districtId,
      DistrictName: this.districtForm.value.districtName,
      DistrictDescription: this.districtForm.value.districtDescription,
      State: {
        StateId: this.selectBoolState ? this.districtForm.value.stateId : this.beforeEdit.stateId
      }
    }

    

    this.locationService.CreateUpdateDistrict(districtObj)
      .subscribe(res => {
        this.districtForm.reset()
        this.selectBoolState = false
        this.getDistricts();
      })
  }


}
