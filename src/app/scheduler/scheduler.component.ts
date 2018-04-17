import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var jQuery: any;
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent implements OnInit {

  form
  user
  psi
  crop
  varient
  GrowersArr = [];
  PSIArr = [];
  CropArr = []
  CropVariantsArr = []
  Role
  UserId
  SchedulerArr = []

  unAssignedListArr = []

  constructor(private authService: AuthService,
    private fb: FormBuilder, ) {

    this.form = this.fb.group({
      grower: ['', Validators.required],
      psi: ['', Validators.required],
      unAssignedLists: ['', Validators.required]
    });

  }
  tableData1
  tableData2
  ngOnInit() {
    

    this.tableData2 = {
      headerRow: ['choose', 'Reg Id', 'Crop Name', 'Seed Class', 'Varient Name', 'Status'],
    };

    this.Role = JSON.parse(window.localStorage.getItem('authToken'));
    console.log(this.Role)

    this.UserId = JSON.parse(window.localStorage.getItem('UserId'));
    console.log(this.UserId)

    var mode = 0;

    this.authService.GetRegistrationsByUser(mode, this.UserId)
      .subscribe(res => {
        console.log(JSON.stringify(res))
        this.SchedulerArr = res

        if (this.SchedulerArr) {
          this.authService.GetGrowersWithOpenRegistrations()
            .subscribe(res => {
              console.log(JSON.stringify(res))
              this.GrowersArr = res

              if (this.GrowersArr) {
                this.authService.GetUsersByRole(3)
                  .subscribe(res => {
                    // console.log(res)
                    this.PSIArr = res
                  })
              }

            })
        }
      })
  }

  radioSelected
  selectGrower() {
    console.log(this.user)
    let mode = 2 //for grower
    let userId = this.user.UserID

    this.authService.GetRegistrationsByUser(mode, userId)
      .subscribe(res => {
        console.log(JSON.stringify(res.length))
        console.log(this.radioSelected)
        this.radioSelected = null
        if (res.length == 0) {
          this.unAssignedListArr = []
          console.log('if')
          this.radioSelected = null
          // this.form.value.unAssignedLists.reset();
          console.log(this.radioSelected)
          // console.log(this.form.value.unAssignedLists)
          // console.log(JSON.stringify(this.form.value))
        } else {
          this.unAssignedListArr = res
        }


      })
  }

  selectPsi() {
    console.log(this.psi)
  }


  onAssign() {

    //console.log('onAssign', JSON.stringify(this.form.value))
    let formObj = this.form.value
    let assignObj = {
      id: formObj.unAssignedLists,
      InspectorId: formObj.psi.UserID,
      Status: 'Assigned'
    }


    console.log(JSON.stringify(assignObj))
    this.authService.AssignInspector(assignObj)
      .subscribe(res => {
        console.log(res)
        this.form.reset()
        this.unAssignedListArr.length = 0

        var mode = 0;
        this.authService.GetRegistrationsByUser(mode, this.UserId)
          .subscribe(res => {
            console.log(JSON.stringify(res))
            this.SchedulerArr = res
          })
      })


    // jQuery("#modal").modal("hide");


  }

  Assign() {
    this.SchedulerArr.push({
      growerName: this.user.FirstName,
      InspectorName: this.psi.FirstName,
      ProductCategoryName: this.crop.ProductCategoryName,
      ProductName: this.varient.ProductName
    })
    console.log(JSON.stringify(this.SchedulerArr))
    this.form.reset()
    this.unAssignedListArr.length = 0
  }

  checkbox
  doalert(ev) {
    console.log(ev)
    //console.log(this.checkbox)
  }

  onCancel() {
    this.form.reset()
    this.unAssignedListArr.length = 0
  }

  arrow = true
  toogleArrow(arrow) {
    console.log(arrow)
    this.arrow = !arrow
  }

  sortgrower
  sortGrower(sortgrower) {

    this.sortgrower = !sortgrower


    console.log(this.sortgrower)



  }
}
