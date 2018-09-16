import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { username, api_key } from '../../models/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.formValidation();
  }
  formValidation() {
    this.signInForm = this.formBuilder.group({
      username: username,
      api_key: api_key, 
      action:"UserLogin",           
      clerk_username: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      clerk_password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doLogin(){
    console.log(this.signInForm.value);
  }


}
