import { Component, OnInit } from '@angular/core';
import { AdminServices } from './../../../../services/Admin/admin.services';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  UserId
  constructor(private adminService: AdminServices) { }
  obvArr = [];
  Obv
  ngOnInit() {
   
    this.UserId = JSON.parse(window.localStorage.getItem('UserId'));
 
    let mode = 0;
    this.adminService.GetObservationsByUser(mode, this.UserId)
      .subscribe(res => {
        this.obvArr = res
      })
  }

  selectObv(obv){
    this.Obv = obv
  }

  arrow = true
  toogleArrow(arrow){
    this.arrow = !arrow
  }

}
