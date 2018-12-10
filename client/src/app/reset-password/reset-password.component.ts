import { Component, OnInit } from '@angular/core';
import {AuthenticationService, UserPayload} from '../services/authentication.service';
import {EmailService} from '../services/email.service';
import {Router} from '@angular/router';
import User from '../models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  credentials: UserPayload ={
    password: '',
    newPassword: '',
    token:''
  };

  constructor(
    private authenticationService : AuthenticationService,
    private router: Router,
    private emailService : EmailService
  ) { }

  ngOnInit() {
    console.log('Initiating reset password from !!!')
    var url = window.location.search.substring(1);
    var tokenValue  = (url.split('&')[0]).split('=');
    this.credentials.token = tokenValue[1];
    console.log('??????????????????????/// %s',this.credentials.token)
  }
  
  savePasswordChange(){
    console.log('============================ save password change ================================='+JSON.stringify(this.credentials));
    this.authenticationService.resetPassword(this.credentials).subscribe(()=>{
      console.log('success !!!!!!!!!!!!!!!')
      this.router.navigateByUrl('/');
    },(err)=>{
      console.error(err);
    });
    
  }

}
