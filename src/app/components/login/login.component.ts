import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { username, api_key } from '../../models/constants';
import { MainService } from '../../main.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  showStatus:boolean;

  constructor(private formBuilder:FormBuilder,private service:MainService,
    private router:Router,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.formValidation();
    this.showStatus = false;
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
    this.showStatus = true;
    console.log(this.signInForm.value); 
    this.service.login(this.signInForm.value).subscribe(res =>{
      this.showStatus = false;
      console.log(res)
      if(res.response_code ==0){
        this.service.makeloggedin(api_key);
        this.router.navigate(['findbus']);
        
      }else{
        this._flashMessagesService.show(res.response_message, { cssClass: 'alert-danger',timeout:5000 } );

      }
      
    },error=>{
      this._flashMessagesService.show(error, { cssClass: 'alert-danger',timeout:6000 } );

    })   
  }


}
