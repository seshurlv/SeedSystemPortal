import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'

@Component({
  selector: 'app-grower-registrations',
  templateUrl: './grower-registrations.component.html',
  styleUrls: ['./grower-registrations.component.scss']
})
export class GrowerRegistrationsComponent implements OnInit {
  growerArr = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    let mode = 3 //for grower
    let UserID = window.localStorage.getItem('UserId')
    //console.log(UserID)
    this.authService.GetRegistrationsByUser(mode,UserID)
    .subscribe(res => {
      //console.log(JSON.stringify(res))
      this.growerArr = res
     

    })
  }

  arrow = true
  toogleArrow(arrow) {
    //console.log(arrow)
    this.arrow = !arrow
  }

   Obv
  getObv(userid) {
    //console.log(JSON.stringify(userid.ID))

    if (userid.Status == 'Inspected') {
      this.authService.GetObservationsByRegId(userid.ID)
        .subscribe(res => {
          //console.log(JSON.stringify(res))
          this.Obv = res
        })
    }
  }

}
