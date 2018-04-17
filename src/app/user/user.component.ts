import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form
  constructor(private authService: AuthService,private fb: FormBuilder,) {

    this.form = this.fb.group({
      firstname: ['',],
      middlename: ['',],
      lastname: ['', ],
      email: ['',],
      mobile: ['', ],
      username: ['', ],
      pobox: ['', ],
      village: ['', ],
      districts: ['', ],
      epas: ['',],
      sections: ['',],
      countries: ['', ],
      states: ['',],
      regions: ['',]
    });



   }
  userProfile
  ngOnInit() {
    let username = JSON.parse(window.localStorage.getItem('username'));
    console.log(username)
    this.authService.getUserDetails(username)
    .subscribe(res => {
      console.log(JSON.stringify(res))
      this.userProfile = res
    })
  }

}
