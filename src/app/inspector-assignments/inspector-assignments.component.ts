import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'

@Component({
  selector: 'app-inspector-assignments',
  templateUrl: './inspector-assignments.component.html',
  styleUrls: ['./inspector-assignments.component.scss']
})
export class InspectorAssignmentsComponent implements OnInit {

  constructor(private authService: AuthService) { }
  growers= []
  newGrowers= []
  ngOnInit() {
    let mode = 1
    let UserID = window.localStorage.getItem('UserId')
    console.log(UserID)
    this.authService.GetRegistrationsByUser(mode,UserID)
    .subscribe(res => {
      console.log(JSON.stringify(res))
      this.growers = res
      //this.newGrowers = this.growers
      this.newGrowers = this.growers.filter((grower) => {
        console.log(grower.Status)
        return grower.Status == 'Assigned'
      })

    })
  }

  arrow = true
  toogleArrow(arrow) {
    console.log(arrow)
    this.arrow = !arrow
  }

}
