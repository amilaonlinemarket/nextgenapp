import { Component } from '@angular/core';
import {AuthenticationService,UserPayload} from './services/authentication.service';
import {Router} from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public auth:AuthenticationService,
     private router:Router
    )
    {
    }

  ngOnInit(): void{
    var x=$(location).attr('href');
    //var myDiv = x.substr(x.indexOf("#") + 1);
    console.log('Applicaion loading !!! %s',x.substr(x.indexOf("#") + 1))
  //   console.log($("#"+myDiv))
  //   $('body, html').animate({
  //     scrollTop: $("#services").offset().top
  // }, 1000)
  }
}


