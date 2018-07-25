import { Component, OnInit } from '@angular/core';
import { AdminServices } from './../../../../services/Admin/admin.services';

@Component({
  selector: 'app-grower-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class GrowerRegistrationsComponent implements OnInit {
  growerArr = [];
  constructor(private adminService: AdminServices) { }

  ngOnInit() {
    let mode = 3 //for grower
    let userID = window.localStorage.getItem('UserId')

    this.adminService.GetRegistrationsByUser(mode, userID)
      .subscribe(res => {
        this.growerArr = res
      })
  }

  arrow = true
  toogleArrow(arrow) {
    this.arrow = !arrow
  }

  Obv
  getObv(userid) {
    
    if (userid.Status == 'Inspected') {
      this.adminService.GetObservationsByRegId(userid.ID)
        .subscribe(res => {
          this.Obv = res
        })
    }
  }

}
