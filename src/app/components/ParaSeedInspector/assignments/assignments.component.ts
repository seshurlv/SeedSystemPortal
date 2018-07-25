import { Component, OnInit } from '@angular/core';
import { AdminServices } from './../../../../services/Admin/admin.services';

@Component({
  selector: 'app-inspector-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class InspectorAssignmentsComponent implements OnInit {

  constructor(private adminService : AdminServices) { }
  growers= []
  newGrowers= []
  ngOnInit() {
    let mode = 1
    let UserID = window.localStorage.getItem('UserId')
    this.adminService.GetRegistrationsByUser(mode,UserID)
    .subscribe(res => {
      this.growers = res
      this.newGrowers = this.growers.filter((grower) => {
        return grower.Status == 'Assigned'
      })

    })
  }

  arrow = true
  toogleArrow(arrow) {
    this.arrow = !arrow
  }

}
