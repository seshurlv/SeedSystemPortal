import { Component, OnInit } from '@angular/core';
//import { Validators, FormBuilder } from '@angular/forms';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user
  constructor(private router:Router,private fb: FormBuilder) { 

    this.user = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  doLogin(){
    //console.log('dologin',this.user)

    this.router.navigate(['/app']);
    
  }

}
