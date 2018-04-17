import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  tableData1
  dataRows = []
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ 'User ID', 'FirstName','LastName', 'Role', 'mobile', 'Email'],
  };

    this.authService.GetUsersList()
    .subscribe(res => {
      console.log(JSON.stringify(res))
      this.dataRows = res
    })
  }

}
