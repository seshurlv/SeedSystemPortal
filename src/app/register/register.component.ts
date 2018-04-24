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

  toastTitle
  form
  Inspform
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
  constructor(private authService: AuthService, private router: Router) {
      this.mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
      this.poBoxPattern = "^[0-9_-]{3,6}$";
      this.decimalPattern = "^[0-9]+(.[0-9]{0,2})?$";
      this.emailPattern = "^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}$"

    this.form = new FormGroup({
      grower: new FormControl(''),
      role: new FormControl(''),
      firstname: new FormControl('', Validators.required),
      middlename: new FormControl(''),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(this.mobnumPattern)])),
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
      area: new FormControl('',Validators.compose([Validators.required, Validators.pattern(this.decimalPattern)])),
      plantingdate: new FormControl('', Validators.required),
      seedclass: new FormControl('', Validators.required),
      seedsource: new FormControl('', Validators.required),
      certificateid: new FormControl(''),
      lotno: new FormControl('', Validators.required),
      crophis: new FormControl(''),
      remarks: new FormControl(''),
      seedevidence: new FormControl('', Validators.required),
      map: new FormControl(''),
      payment: new FormControl(''),
    })
    // this.Inspform = this.fb.group({
    //   product: ['', Validators.required],
    //   productCategory: ['', Validators.required],
    //   area: ['', Validators.required],
    //   plantingdate: ['', Validators.required],
    //   seedclass: ['', Validators.required],
    //   seedsource: ['', Validators.required],
    //   certificateid: [''],
    //   lotno: ['', Validators.required],
    //   crophis: ['',],
    //   remarks: [''],
    //   seedevidence: ['', Validators.required],
    //   map: [''],
    //   payment: [''],
    // })



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

    console.log(this.router.url);
    if (this.router.url == '/inspectionReg') {
      this.inspection = true;
      this.title = 'Inspection Register Form';
      this.authService.GetUsersByRole(4)
        .subscribe(res => {
          console.log(JSON.stringify(res))
          this.GrowersArr = res;

          if (this.GrowersArr) {
            this.authService.GetProductCategory()
              .subscribe(res => {
                console.log(JSON.stringify(res))
                this.prodCategoryArr = res

                if (this.prodCategoryArr) {
                  this.authService.GetProductClassList()
                    .subscribe(res => {
                      console.log(JSON.stringify(res))
                      this.seedClassArr = res
                    })
                }

              })
          }

        })






    } else {
      this.title = 'Register Form';

      this.authService.getCountries()
        .subscribe(res => {
          this.countriesArr = res
          console.log('get Countries API ' + JSON.stringify(this.countriesArr))
          if (res) {
            this.authService.getStates()
              .subscribe(stateRes => {
                this.statesArr = stateRes
                console.log('get States API ' + JSON.stringify(this.statesArr))
                if (stateRes) {
                  this.authService.getRegions()
                    .subscribe(regionRes => {
                      this.regionsArr = regionRes
                      console.log('get States API ' + JSON.stringify(this.regionsArr))
                    }, error => {
                      console.log('get Regions ERR API ', error)
                    })
                }
              }, error => {
                console.log('get States ERR API ', error)
              })
          }
        }, error => {

          console.log('Get Countries ERR API ', error)
        })





      this.authService.getRoles()
        .subscribe(res => {
          console.log('getRoles API' + JSON.stringify(res))
          this.RolesArr = res
          if (this.RolesArr) {
            this.authService.GetDistricts()
              .subscribe(res => {
                console.log('Get Districts API ' + JSON.stringify(res))
                this.districtsArr = res
              }, error => {
                console.log('Get Districts ERR API ', error)
              })
          }
        }, error => {
          console.log('getRoles ERR API', error)
        })


    }


  }

  selectRole(ev) {
    // console.log(this.roleId)
    // console.log(ev)
  }

  selectDistrict(discrict) {
    console.log(discrict)
    console.log(this.districtId)

    this.authService.getEpaByDistrictId(discrict.DistrictID)
      .subscribe(res => {
        this.epaArray = res
        console.log(this.epaArray)
      })

  }

  selectEpa(epa) {
    console.log(JSON.stringify(epa))
    console.log(this.epaId)

    this.authService.GetSectionByEPAId(epa.ID)
      .subscribe(res => {
        this.sectionArray = res
        console.log(this.sectionArray)
      })
  }

  selectSection(sectionId) {
    // console.log(sectionId)
    // console.log(this.sectionId)
  }

  selectCountry() {

  }

  selectState() {

  }

  selectRegion() {

  }

  onRegister() {
    console.log('onRegister', this.form.value)
    let formObj = this.form.value


    var user = {
      Role: {
        RoleId: formObj.role
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

    user[FarmDetails] = {
      FarmAddress: "",
      FarmContact: ""
    }
    console.log(JSON.stringify(user))

    this.authService.createUser(user)
      .subscribe(res => {
        console.log(JSON.stringify(res))
        this.toastTitle = 'Registration';
        if (res == 1) {
          this.form.reset();
          this.RegsucessAlert = true;

          setTimeout(() => {
            this.RegsucessAlert = false;
            console.log('RegsucessAlert')
          }, 5000)

        } else {
          this.RegfailureAlert = true
          setTimeout(() => {
            this.RegfailureAlert = false;
            console.log('RegfailureAlert')
          }, 5000)
        }

      })

  }

  selectGrower(growerId) {
    console.log(this.user)
    console.log(growerId)
    this.growerRoleId = growerId
  }

  selectProdCat(ProductCat) {
    console.log(ProductCat.ProductCategoryID)
    this.authService.GetProductsByProductCategoryId(ProductCat.ProductCategoryID)
      .subscribe(res => {
        console.log(res)
        this.productArr = res
      })
  }

  onInspectionRegister() {
    console.log("onInspection")
    let formObj = this.Inspform.value;
    //console.log('onRegister', JSON.stringify(formObj))
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

    if (this.growerRoleId) {
      this.authService.RegisterInspection(InsReg)
        .subscribe(res => {
          console.log(res)
          this.toastTitle = 'Inspection Registration'
          if (res == 1) {
            this.Inspform.reset();
            this.clearUserDetails()
            this.RegsucessAlert = true;
            window.scrollTo(0, 0)
            setTimeout(() => {
              console.log('setTimeout')
              this.RegsucessAlert = false;
              console.log('RegsucessAlert')
            }, 5000)

          } else {
            this.RegfailureAlert = true
            window.scrollTo(0, 0)
            setTimeout(() => {
              this.RegfailureAlert = false;
              console.log('RegfailureAlert')
            }, 5000)
          }
        })
    }






    console.log('this.user ' + JSON.stringify(this.user))

    //console.log('onRegister', JSON.stringify(InsReg))
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


}
