import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/Users/users.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminServices } from './../../../../services/Admin/admin.services';
import { CropServices } from './../../../../services/Crops/crops.services'

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
  growersArr = [];
  psiArr = [];
  userId
  schedulerArr = []
  unAssignedListArr = []
  display = 'none';
  tableheading
  radioSelected
  obv
  sortgrower
  
  constructor(private usersService: UsersService,
    private fb: FormBuilder,
    private adminService: AdminServices,
    private cropServices: CropServices) {

    this.form = this.fb.group({
      grower: ['', Validators.required],
      psi: ['', Validators.required],
      unAssignedLists: ['', Validators.required]
    });

  }

  ngOnInit() {

    this.tableheading = {
      headerRow: ['choose', 'Reg Id', 'Crop Name', 'Seed Class', 'Varient Name', 'Status'],
    };


    this.userId = JSON.parse(window.localStorage.getItem('UserId'));
    let mode = 0;

    this.adminService.GetRegistrationsByUser(mode, this.userId)
      .subscribe(res => {

        this.schedulerArr = res

        if (this.schedulerArr) {
          this.cropServices.GetGrowersWithOpenRegistrations()
            .subscribe(res => {

              this.growersArr = res

              if (this.growersArr) {
                this.usersService.GetUsersByRole(3)
                  .subscribe(res => {

                    this.psiArr = res
                  })
              }

            })
        }
      })
  }

  
  selectGrower() {

    let mode = 2 //for grower
    let userId = this.user.UserID

    this.adminService.GetRegistrationsByUser(mode, userId)
      .subscribe(res => {

        this.radioSelected = null
        if (res.length == 0) {
          this.unAssignedListArr = []

          this.radioSelected = null

        } else {
          this.unAssignedListArr = res
        }


      })
  }


  onAssign() {

    let formObj = this.form.value
    let assignObj = {
      id: formObj.unAssignedLists,
      InspectorId: formObj.psi.UserID,
      Status: 'Assigned'
    }



    this.adminService.AssignInspector(assignObj)
      .subscribe(res => {

        this.form.reset()
        this.unAssignedListArr.length = 0

        let mode = 0;
        this.adminService.GetRegistrationsByUser(mode, this.userId)
          .subscribe(res => {
            this.schedulerArr = res
          })
      })

  }

  Assign() {
    this.schedulerArr.push({
      growerName: this.user.FirstName,
      InspectorName: this.psi.FirstName,
      ProductCategoryName: this.crop.ProductCategoryName,
      ProductName: this.varient.ProductName
    })

    this.form.reset()
    this.unAssignedListArr.length = 0
  }


  doalert(ev) {
    //console.log(ev)
  }

  onCancel() {
    this.form.reset()
    this.unAssignedListArr.length = 0
  }

  arrow = true
  toogleArrow(arrow) {
    this.arrow = !arrow
  }

  
  sortGrower(sortgrower) {
    this.sortgrower = !sortgrower
  }

  
  getObv(userid) {
    if (userid.Status == 'Inspected') {
      this.adminService.GetObservationsByRegId(userid.ID)
        .subscribe(res => {
          this.obv = res
        })
    }
  }

}
