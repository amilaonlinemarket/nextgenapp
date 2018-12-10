import { Component, OnInit } from '@angular/core';
import {UserService,UserInfo} from '../services/user.service';
import {EmailService} from '../services/email.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $:any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  success :boolean;
  error :boolean;
  public loading = false;
  message:string;
  
  user:UserInfo={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    address:{street:'',city:''},
    isAgreed:false
  }
  model: any = {};

  constructor( private userService : UserService,
  private emailService: EmailService) { }

  ngOnInit() {
    $("#conf_password").on('keyup', function () {
      var pass1 = $('#password').val();
      var pass2 = $('#conf_password').val();
      var message = $('#confirmMessage').val();
      var goodColor = "#66cc66";
      var badColor = "#ff6666";
      console.log('ccc :'+(pass1 == pass2))
      if (pass1 == pass2) {
        $("#confirmMessage").removeClass("ps-error").html("");
      } else {
        $("#confirmMessage").removeClass("match").addClass("ps-error").html("Passwords Do Not Match!")
      }
    });

    $("#submit").click(function(event) {
      var form = $("#form-register");
      console.log(form[0].password.value+ '::::: '+form[0].conf_password.value)
      if(form[0].password.value!=form[0].conf_password.value){
        event.preventDefault();
        $('#conf_password').css('border-color', 'red');
      }
      if (form[0].checkValidity() === false ) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      form.addClass('was-validated');
    });
  }

  public getColor(){
    if(this.success==true){
      return "alert alert-success"
    }else if(this.error==true){
      return "alert alert-danger"
    }
  }

  public getMessage(){
    return this.message;
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
    this.loading = true;
    console.log('Create user :%s',JSON.stringify(this.user));
    this.userService.createUser(this.user).subscribe((data)=>{
      this.message = 'Registration Success.'
      this.success = true;
      this.loading =false;
    },
    (err: HttpErrorResponse) => {
      this.loading =false;
      this.error =true;
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
        this.message = 'Registration failed. Internal server error.'
      } else {
        console.log("Server-side error occured."+JSON.stringify(err.error.msg));
        this.message = err.error.msg;
      }
    }
  );
  }

}

// function validatephone(phone) 
// {
//     var maintainplus = '';
//     var numval = phone.value
//     if ( numval.charAt(0)=='+' )
//     {
//         var maintainplus = '';
//     }
//     curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,'');
//     phone.value = maintainplus + curphonevar;
//     var maintainplus = '';
//     phone.focus;
// }
// // validates text only
// function Validate(txt) {
//     txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
// }
// // validate email
// function email_validate(email)
// {
// var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

//     if(regMail.test(email) == false)
//     {
//     document.getElementById("status").innerHTML    = "<span class='warning'>Email address is not valid yet.</span>";
//     }
//     else
//     {
//     document.getElementById("status").innerHTML	= "<span class='valid'>Thanks, you have entered a valid Email address!</span>";	
//     }
// }
// // validate date of birth
// function dob_validate(dob)
// {
// var regDOB = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;

//     if(regDOB.test(dob) == false)
//     {
//     document.getElementById("statusDOB").innerHTML	= "<span class='warning'>DOB is only used to verify your age.</span>";
//     }
//     else
//     {
//     document.getElementById("statusDOB").innerHTML	= "<span class='valid'>Thanks, you have entered a valid DOB!</span>";	
//     }
// }
// // validate address
// function add_validate(address)
// {
// var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;
  
//     if(regAdd.test(address) == false)
//     {
//     document.getElementById("statusAdd").innerHTML	= "<span class='warning'>Address is not valid yet.</span>";
//     }
//     else
//     {
//     document.getElementById("statusAdd").innerHTML	= "<span class='valid'>Thanks, Address looks valid!</span>";	
//     }
// }

