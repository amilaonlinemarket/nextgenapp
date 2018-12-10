import { Component, OnInit } from '@angular/core';
import {RestclientService} from '../services/restclient.service';

declare var $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  success=0;
  response='';
  result=true;

  contactUs:any={
    name:'',
    email:'',
    subject:'',
    message:''
  }

  constructor(
    public restclient:RestclientService
  ) { }

  ngOnInit() {
    $('.nav-menu .menu-active').removeClass('menu-active');
    //$('.nav-menu')[6].removeClass('menu-active');
    //$(this).first('li').addClass('menu-active');
   
  }

  getResponse(){
    return this.success;
  }
  
  submitContactUs(){
    console.log(this.contactUs.name)
    console.log('contact us -------------------------------------')
    this.restclient.submitContactUs(this.contactUs).subscribe(()=>{
      console.log('success !!!!!!!!!!!!!!!')
      this.success=1;
      this.response ='Your message has been sent. Thank you!'
      
    },(err)=>{
      console.error(err);
      this.success =-1;
      this.response = 'Try again later'
    });
  }

}
