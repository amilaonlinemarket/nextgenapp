import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService,UserPayload } from '../services/authentication.service';
import {EmailService} from '../services/email.service';


declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:string;
  credentials: UserPayload ={
    email: '',
    password: ''
  };

  constructor(
    private authenticationService : AuthenticationService,
    private emailService: EmailService,
    private router: Router
    
  ) { }

  ngOnInit() {
    $('ul.nav-menu li').removeClass('menu-active')
    // $('ul.nav-menu li a').removeClass('menu-active');
    $( "ul.nav-menu li a" ).eq( 6 ).css( 'color','#18d26e' );
    console.log('Initialzing login component !!!!');
    $("#signUp").click(function(event) {

      //Fetch form to apply custom Bootstrap validation
      var form = $("#loginForm")
  
      if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      form.addClass('was-validated');
    });

    $("#resetSubmit").click(function(){
      var email =$("#email").val();
      $("#msg").addClass("fadeOutMessage").text("sent an email to "+email +" Click the link in the email to reset your password.");
      setTimeout(function(){
        $('#myModal').modal('toggle');
      },4000)
    })

  }

  submit() {
    console.log('User login submit');
    this.authenticationService.login(this.credentials).subscribe(()=>{
      console.log('success !!!!!!!!!!!!!!!')
      this.router.navigateByUrl('/');
    },(err)=>{
      console.log('Error occur :%s',JSON.stringify(err));
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
        this.message = 'Registration failed. Internal server error.'
      } else {
        console.log("Server-side error occured."+JSON.stringify(err.error.message));
        this.message = err.error.message;
      }
    });
   }

   resetPassword(){
    console.log('=============================reset password =============================== %s',this.credentials.email )
    this.emailService.getAsyncData(this.credentials.email)
    console.log('?mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
   //  this.emailService.sendNotification(this.credentials.email).subscribe(()=>{
   //   console.log('success !!!!!!!!!!!!!!!')
   // },(err)=>{
   //   console.error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee '+err);
   // });
  }

}
