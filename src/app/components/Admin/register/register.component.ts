import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UsersService } from './../../../../services/Users/users.services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminServices } from './../../../../services/Admin/admin.services';
import { LocationServices } from './../../../../services/Locations/locations.services';
import { ProductServices } from './../../../../services/products/products.services';


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
  inspform
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

  constructor(private locationService: LocationServices,
    private usersService: UsersService,
    private adminServices: AdminServices,
    private router: Router,
    private productService : ProductServices) {

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

    this.inspform = new FormGroup({
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

  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
    if (this.router.url == '/inspectionReg') {
      this.inspection = true;
      this.title = 'Inspection Register Form';
      this.usersService.GetUsersByRole(4)
        .subscribe(res => {
          
          this.GrowersArr = res;

          if (this.GrowersArr) {
            this.productService.GetProductCategory()
              .subscribe(res => {
                
                this.prodCategoryArr = res
              })
          }
        })

      this.productService.GetProductClassList()
        .subscribe(res => {
          
          this.seedClassArr = res
        })

    } else {
      this.inspection = false;
      this.title = 'Register Form';

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

      this.usersService.getRoles()
        .subscribe(res => {
          
          this.RolesArr = res
          if (this.RolesArr) {
            this.locationService.GetDistricts()
              .subscribe(res => {
              
                this.districtsArr = res
              }, error => {
              
              })
          }
        }, error => {
         
        })


    }


  }

  selectRole(ev) {
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

  selectSection(sectionId) {
    
  }

  selectCountry(country) {
    
    this.locationService.GetStatesByCountryId(country.CountryID)
      .subscribe(res => {
        this.statesArr = res
      })
  }



  onRegister() {
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


    if (this.form.valid) {
      this.usersService.createUser(user)
        .subscribe(res => {
         
          this.toastTitle = 'Registration';
          if (res == 1) {
            this.form.reset();
            this.farmAddressArr.length = 0;
            this.positions.length = 0;
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

  }


  growerObj
  selectGrower(growers) {
    
    var assignVal;
    var grower = growers.filter((grower) => {
      this.growerObj = grower
      
    })
    

    if (this.user.FirstName == '' || this.user.FirstName == null) {
      
      assignVal = true
    } else {
      if (this.growerObj.FirstName == this.user.FirstName) {
        
        this.clearUserDetails();
      } else {
        assignVal = true
      }
    }


    if (assignVal) {
      this.growerRoleId = this.growerObj.UserID
     
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
    
    this.productService.GetProductsByProductCategoryId(ProductCat.ProductCategoryID)
      .subscribe(res => {
      
        this.productArr = res
      })
  }

  grower
  onInspectionRegister() {
   
    let formObj = this.inspform.value;
   

    if (this.inspform.valid) {
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

      this.adminServices.RegisterInspection(InsReg)
        .subscribe(res => {
         
          this.toastTitle = 'Inspection Registration'
          if (res == 1) {
            this.inspform.reset();
            this.clearUserDetails()
            this.grower = [];
            

            this.RegsucessAlert = true;

            setTimeout(() => {
              this.RegsucessAlert = false;
             
            }, 5000)

          } else {
            this.RegfailureAlert = true
            window.scrollTo(0, 0)
            setTimeout(() => {
              this.RegfailureAlert = false;
              
            }, 5000)
          }
        })
    }
    
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
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude
  }

  posi
  farmAddressArr = []
  saveLocation() {
   
    this.positions.filter((pos) => {
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
      this.Farm.reset()
    }
  }

  positions: any[] = [];
  onClick(event) {
  
    if (event) {
      var tempLat = event.latLng.lat();
      var tempLng = event.latLng.lng();
    }


    var LatLng = {
      lat: tempLat,
      lng: tempLng
    }
   
    if (this.Farm.valid) {
      if (this.farmAddressArr.length == this.positions.length) {
        if (event instanceof MouseEvent) return;
        this.positions.push(LatLng);
        event.target.panTo(event.latLng);
      }
    } else {
      this.cropValidationAlert = true;
      setTimeout(() => {
        this.cropValidationAlert = false;
      }, 3000)
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
      let test = JSON.parse(this.posi)

      if (test.lat == marker) {
        this.positions.splice(i, 1)
        this.farmAddressArr.splice(i, 1)
      }
    }
  }
}
