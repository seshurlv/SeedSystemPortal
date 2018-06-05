import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inspection-registration',
  templateUrl: './inspection-registration.component.html',
  styleUrls: ['./inspection-registration.component.scss']
})
export class InspectionRegistrationComponent implements OnInit {
  form
  GrowersArr = [];
  constructor(private authService: AuthService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        grower: ['', ],
        psi:[''],
        firstname: ['', ],
        lastname:'',
        email:'',
        mobile:'',
        username:'',
        password:'',
        farmAddresss:'',
        pobox:'',
        village:'',
        farmmobile:'',
        districts:'',
        epas:'',
        sections:'',
      });
     }

  ngOnInit() {
    // this.authService.GetUsersByRole()
    // .subscribe(res => {
    //   console.log(JSON.stringify(res))
    //   this.GrowersArr = res;
    // })
  }

  selectGrower(growerName){
    //console.log(growerName)
  }

}
