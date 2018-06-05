import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  sucessAlert: boolean = false
  failureAlert: boolean = false
  RegsucessAlert: boolean = false
  RegfailureAlert: boolean = false
  cropValidationAlert: boolean = false

  toastTitle
  form
  Inspform
  Farm
  sectionArray = [];
  districtsArr = []
  epaArray = [];
  RolesArr = [];
  GrowersArr = [];
  countriesArr = [];
  statesArr = [];
  regionsArr = [];
  prodCategoryArr = [];
  productArr = []
  seedClassArr = []
  growerRoleId
  sourceSeedArr = [{
    sourceSeedId: 'ICRISAT'
  }]

  seedCertificateArr = [{
    certId: 'certificate1'
  }, {
    certId: 'certificate2'
  }, {
    certId: 'certificate3'
  }]

  paymentsArr = ['cheque', 'Cash', 'Bank Transfer']


  districtId
  roleId
  epaId
  sectionId
  inspection
  title
  mobnumPattern
  user: any;
  poBoxPattern
  decimalPattern
  emailPattern
  namePattern

  config = {
    displayKey: "FirstName", //if objects array passed which key to be displayed defaults to description,
    search: true //enables the search plugin to search in the list
  }

  certConfig = {
    displayKey: "certId", //if objects array passed which key to be displayed defaults to description,
    search: true, //enables the search plugin to search in the list,
    height: 'auto'
  }

  marker = {
    display: true,
    lat: null,
    lng: null,
  };

  constructor(private authService: AuthService, private router: Router) {
    this.mobnumPattern = "^((\\+91-?)|0)?[0-9]{9}$";
    this.poBoxPattern = "^[0-9_-]{3,6}$";
    this.decimalPattern = "^[0-9]+(.[0-9]{0,2})?$";
    this.emailPattern = "^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.namePattern = "^[a-zA-Z]*$"

    this.form = new FormGroup({
      // role: new FormControl(''),
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
    })

    this.Inspform = new FormGroup({
      product: new FormControl('', Validators.required),
      productCategory: new FormControl('', Validators.required),
      area: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.decimalPattern)])),
      plantingdate: new FormControl('', Validators.required),
      seedclass: new FormControl('', Validators.required),
      seedsource: new FormControl('', Validators.required),
      // certificateid: new FormControl(''),
      lotno: new FormControl('', Validators.required),
      crophis: new FormControl(''),
      remarks: new FormControl(''),
      seedevidence: new FormControl('', Validators.required),
      map: new FormControl(''),
      payment: new FormControl(''),
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

    // this.positions = this.getRandomMarkers();
    // console.log(this.positions)
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    //console.log(this.router.url);
    if (this.router.url == '/inspectionReg') {
      this.inspection = true;
      this.title = 'Inspection Register Form';
      this.authService.GetUsersByRole(4)
        .subscribe(res => {
          //console.log(JSON.stringify(res))
          this.GrowersArr = res;

          if (this.GrowersArr) {
            this.authService.GetProductCategory()
              .subscribe(res => {
                //console.log(JSON.stringify(res))
                this.prodCategoryArr = res
              })
          }
        })

      this.authService.GetProductClassList()
        .subscribe(res => {
          //console.log(JSON.stringify(res))
          this.seedClassArr = res
        })

    } else {
      this.inspection = false;
      this.title = 'Register Form';

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
          //console.log('get Countries API ' + JSON.stringify(this.countriesArr))
        }, error => {
          //console.log('Get Countries ERR API ', error)
        })

      this.authService.getRoles()
        .subscribe(res => {
          //console.log('getRoles API' + JSON.stringify(res))
          this.RolesArr = res
          if (this.RolesArr) {
            this.authService.GetDistricts()
              .subscribe(res => {
                //console.log('Get Districts API ' + JSON.stringify(res))
                this.districtsArr = res
              }, error => {
                //console.log('Get Districts ERR API ', error)
              })
          }
        }, error => {
          //console.log('getRoles ERR API', error)
        })


    }


  }

  selectRole(ev) {
    //console.log(this.roleId)
    //console.log(ev)
  }

  selectDistrict(discrict) {
    //console.log(discrict)
    //console.log(this.districtId)

    this.authService.getEpaByDistrictId(discrict.DistrictID)
      .subscribe(res => {
        this.epaArray = res
        //console.log(this.epaArray)
      })

  }

  selectEpa(epa) {
    //console.log(JSON.stringify(epa))
    //console.log(this.epaId)

    this.authService.GetSectionByEPAId(epa.ID)
      .subscribe(res => {
        this.sectionArray = res
        //console.log(this.sectionArray)
      })
  }

  selectSection(sectionId) {
    // console.log(sectionId)
    // console.log(this.sectionId)
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

  onRegister() {
    //console.log('onRegister', this.form.valid)
    let formObj = this.form.value


    var user = {
      UserId: 0,
      Role: {
        RoleId: this.roleId
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
      FarmDetails: this.farmAddressArr
    }

    console.log(JSON.stringify(user))

    if (this.form.valid) {
      this.authService.createUser(user)
        .subscribe(res => {
          console.log(JSON.stringify(res))
          this.toastTitle = 'Registration';
          if (res == 1) {
            this.form.reset();
            this.farmAddressArr.length = 0;
            this.positions.length = 0;
            this.RegsucessAlert = true;

            setTimeout(() => {
              this.RegsucessAlert = false;
              //console.log('RegsucessAlert')
            }, 5000)

          } else {
            this.RegfailureAlert = true
            setTimeout(() => {
              this.RegfailureAlert = false;
              //console.log('RegfailureAlert')
            }, 5000)
          }
        })
    }


  }


  growerObj
  selectGrower(growers) {
    //console.log(this.user)
    var assignVal;
    //this.growerRoleId = growerId

    var grower = growers.filter((grower) => {
      this.growerObj = grower
      //return grower
    })
    //console.log(JSON.stringify(this.growerObj))

    if (this.user.FirstName == '' || this.user.FirstName == null) {
      //console.log('if')
      assignVal = true
    } else {
      if (this.growerObj.FirstName == this.user.FirstName) {
        //console.log('if else')
        this.clearUserDetails();
      } else {
        assignVal = true
      }
    }


    if (assignVal) {
      this.growerRoleId = this.growerObj.UserID
      //this.user.UserID = this.growerObj.UserID

      this.user = {
        UserID: this.growerObj.UserID,
        FirstName: this.growerObj.FirstName,
        MiddleName: this.growerObj.MiddleName,
        LastName: this.growerObj.LastName,
        Email: this.growerObj.Email,
        MobileNumber: this.growerObj.MobileNumber,
        Address: {
          PostalCode: this.growerObj.Address.PostalCode,
          AddressLine1: this.growerObj.Address.AddressLine1,
          District: {
            DistrictName: this.growerObj.Address.District.DistrictName
          },
          EPA: {
            EPAName: this.growerObj.Address.EPA.EPAName
          },
          Section: {
            SectionName: this.growerObj.Address.Section.SectionName
          },
          Country: {
            CountryName: this.growerObj.Address.Country.CountryName
          },
          Region: {
            RegionName: this.growerObj.Address.Region.RegionName
          },
          State: {
            StateName: this.growerObj.Address.State.StateName
          }
        }
      }
    }
  }

  selectProdCat(ProductCat) {
    //console.log(ProductCat.ProductCategoryID)
    this.authService.GetProductsByProductCategoryId(ProductCat.ProductCategoryID)
      .subscribe(res => {
        //console.log(res)
        this.productArr = res
      })
  }

  grower
  onInspectionRegister() {
    console.log(this.grower)
    let formObj = this.Inspform.value;
    //console.log('onRegister', JSON.stringify(formObj))

    if (this.Inspform.valid) {
      var InsReg = {
        GrowerId: this.growerRoleId,
        ProductCategoryId: formObj.product.ProductCategoryID,
        ProductId: formObj.productCategory.ProductID,
        Area: formObj.area,
        PlantingDate: formObj.plantingdate,
        SeedClassId: formObj.seedclass.ID,
        SeedSource: formObj.seedsource.sourceSeedId,
        Certificate: '',
        SeedLot: formObj.lotno,
        CroppingHistory: '',
        Remarks: '',
        SeedSourceEvidence: formObj.seedevidence,
        GPS: "GPS",
        PaymentOption: '',
        Status: "Registered"
      }
    }


    if (this.growerRoleId) {

      this.authService.RegisterInspection(InsReg)
        .subscribe(res => {
          //console.log(res)
          this.toastTitle = 'Inspection Registration'
          if (res == 1) {
            this.Inspform.reset();
            this.clearUserDetails()
            // this.grower = [];
            // this.GrowersArr.length = 0

            this.RegsucessAlert = true;

            setTimeout(() => {
              //console.log('setTimeout')
              this.RegsucessAlert = false;
              //console.log('RegsucessAlert')
            }, 5000)

          } else {
            this.RegfailureAlert = true
            window.scrollTo(0, 0)
            setTimeout(() => {
              this.RegfailureAlert = false;
              //console.log('RegfailureAlert')
            }, 5000)
          }
        })
    }
    //console.log('this.user ' + JSON.stringify(this.user))
  }

  clearUserDetails() {
    this.user = {
      FirstName: null,
      LastName: null,
      Email: null,
      Mobile: null,
      UserName: null,
      Password: null,
      PostalCode: null,
      AddressLine1: null,
      Address: {
        District: {
          DistrictName: null
        },
        EPA: {
          EPAName: null
        },
        Section: {
          SectionName: null
        },
        Country: {
          CountryName: null
        },
        Region: {
          RegionName: null
        },
        State: {
          StateName: null
        }
      }
    }
  }




  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }

  lat = 17.4233564;
  long = 78.33927729999999;

  showPosition(position) {
    //console.log(position.coords.latitude)
    //console.log(position.coords.latitude)
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude
  }


  // getRandomMarkers() {
  //   let randomLat: number, randomLng: number;
  //   let positions = [];
  //   for (let i = 0; i < 9; i++) {
  //     randomLat = Math.random() * (-13.254308 - -14.381662) + -14.381662;
  //     randomLng = Math.random() * (33.325484 - 34.325484) + 34.325484;
  //     positions.push([randomLat, randomLng]);
  //   }
  //   return positions;
  // }


  posi
  farmAddressArr = []
  saveLocation() {
    // console.log(JSON.stringify(this.Farm.value))
    // console.log(JSON.stringify(this.positions))

    this.positions.filter((pos) => {
      //console.log(pos.lng)
      //console.log(JSON.stringify(pos))
      //console.log(pos)
      this.posi = pos
    })
    if (this.posi) {
      this.farmAddressArr.push({
        Id: 0,
        FarmTitle: this.Farm.value.FarmTitle,
        FarmAddress: this.Farm.value.FarmAddress,
        FarmContact: this.Farm.value.FarmContact,
        FarmLattitude: this.posi.lat,
        FarmLongitude: this.posi.lng,
        FarmImageURL: ""
      })
      //console.log(JSON.stringify(this.farmAddressArr))
      this.Farm.reset()
    }
  }

  positions: any[] = [];
  onClick(event) {
    //console.log(event.Ia.isTrusted)

    if (event) {
      var tempLat = event.latLng.lat();
      var tempLng = event.latLng.lng();
    }


    var LatLng = {
      lat: tempLat,
      lng: tempLng
    }
    //console.log(LatLng)


    // console.log(event.latLng.lat)
    // console.log(event.latLng.lng)


    if (this.Farm.valid) {
      if (this.farmAddressArr.length == this.positions.length) {
        if (event instanceof MouseEvent) return;
        this.positions.push(LatLng);
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
    // event.target.panTo(event.latLng);
    // console.log(event.target.panTo(event.latLng))
  }

  clicked({ target: marker }) {
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  removeMarker(marker) {
    //console.log(marker)
    for (var i = 0; i < this.positions.length; i++) {
      this.posi = JSON.stringify(this.positions[i])
      let test = JSON.parse(this.posi)
      //console.log(test.lat)

      if (test.lat == marker) {
        //console.log('if')
        //console.log(i)
        //console.log(test.lat)
        //console.log(JSON.stringify(marker.lat))
        this.positions.splice(i, 1)
        this.farmAddressArr.splice(i, 1)
      }
    }
  }
}
