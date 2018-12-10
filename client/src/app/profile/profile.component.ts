import { Component, OnInit } from '@angular/core';
import {UserService,UserInfo} from '../services/user.service';
import {AuthenticationService,UserPayload} from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  success :boolean;
  error :boolean;

  user:UserInfo={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    address:{street:'',city:''},
    isAgreed:false
  }

  constructor(private userService:UserService,
    public auth:AuthenticationService) { }

  ngOnInit() {

  }

  public getColor(){
    if(this.success==true){
      return "alert alert-success"
    }else if(this.error==true){
      return "alert alert-danger"
    }
  }

  public getMessage(){
    if(this.success==true){
      return "User registration success. "
    }else if(this.error==true){
      return "Submit failed. Try again "
    }
  }
  public isSuccess(){
    if(this.success==true){
      return true
    }
  }
  public isFailed(){
    if(this.error==true){
      return true
    }
  }
  submit(){
    console.log('Create user :%s',JSON.stringify(this.user));
    this.user.email=this.auth.getUserDetails().email;
    this.userService.updateUser(this.user).subscribe((data)=>{
      this.success = true;
    },(err)=>{
      console.error('Error :%s',err);
      this.error =true;
    });
   }

}
