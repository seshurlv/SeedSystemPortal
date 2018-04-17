import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  UserId
  constructor(private authService: AuthService) { }
  tableData1
  obvArr = [];
  Obv
  ngOnInit() {
    this.tableData1 = {
      headerRow: ['Id','Grower', 'Inspector/Psi', 'Crop', 'Variety', 'Class of seed', 'Status', 'Observed Date' ,''],
    };
    this.UserId = JSON.parse(window.localStorage.getItem('UserId'));
    console.log(this.UserId)
    let mode = 0;
    this.authService.GetObservationsByUser(mode, this.UserId)
      .subscribe(res => {
        console.log(JSON.stringify(res))
        this.obvArr = res
      })
  }

  selectObv(obv){
    console.log(JSON.stringify(obv))
    this.Obv = obv
  }

  arrow = true
  toogleArrow(arrow){
    console.log(arrow)
    this.arrow = !arrow
  }

}
