import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/Users/users.services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  tableHeadding
  dataRows = []
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.tableHeadding = {
      headerRow: [ 'User ID', 'First Name','Last Name', 'Role', 'mobile', 'Email'],
  };

    this.usersService.GetUsersList()
    .subscribe(res => {
      this.dataRows = res
    })
  }

}
