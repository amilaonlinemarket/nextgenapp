import { Component, OnInit } from '@angular/core';
import {RestclientService} from '../services/restclient.service';
import {Router} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  success=0;
  response='';
  result=true;

  contactUs:any={
    name:'',
    email:'',
    subject:'',
    message:''
  }
   businessList:any;
    label="UK";

  constructor( 
    public restclient:RestclientService,
    private router:Router
  ) { }

  ngOnInit() {

     this.businessList =[{
      image:"./assets/img/portfolio/edumain.jpg",
      routerLink:"/business/hub",
      // routerLink:"/edu/classes",
      category:'education',
      sub:'o/l',
      label:"O/L classes",
      filter:'filter-edu',
      viewTemplate:'education'
    },
    {
    image:"./assets/img/portfolio/app1.jpg",
      // routerLink:"/edu/classes",
      routerLink:"/business/hub",
      category:'education',
      sub:'a/l',
      label:"A/L classes",
      filter:'filter-edu',
      viewTemplate:'education'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
      // routerLink:"/edu/classes",
      routerLink:"/business/hub",
      category:'education',
      sub:'it',
      label:"IT Education",
      filter:'filter-edu',
      viewTemplate:'education'
  },
  {
  image:"./assets/img/portfolio/app1.jpg",
      // routerLink:"/edu/classes",
      routerLink:"/business/hub",
      category:'education',
      sub:'dancing',
      label:"Dancing",
      filter:'filter-edu',
      viewTemplate:'education'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'house',
    label:"Houses",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'room',
    label:"Rooms",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'building',
    label:"Building",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/construction",
    routerLink:"/business/hub",
    category:'construction',
    sub:'building',
    label:"Building construction",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/construction",
    routerLink:"/business/hub",
    category:'construction',
    sub:'soil',
    label:"Soil suppilers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/construction",
    routerLink:"/business/hub",
    category:'construction',
    sub:'hardware',
    label:"Hardware suppilers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'hotel',
    label:"Hotels",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'kabana',
    label:"Kabanas",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'gh',
    label:"Guest House",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/printing",
    routerLink:"/business/hub",
    category:'printing',
    sub:'digi_print',
    label:"Digital printing",
    filter:'filter-prt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/transport",
    routerLink:"/business/hub",
    category:'transport',
    sub:'van',
    label:"Van",
    filter:'filter-trp',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/transport",
    routerLink:"/business/hub",
    category:'transport',
    sub:'car',
    label:"Car",
    filter:'filter-trp',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/transport",
    routerLink:"/business/hub",
    category:'transport',
    sub:'lorry',
    label:"Lorry",
    filter:'filter-trp',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/serSation",
    routerLink:"/business/hub",
    category:'services',
    sub:'motor',
    label:"Service Sation",
    filter:'filter-ses',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/renting",
    routerLink:"/business/hub",
    category:'rent',
    sub:'ins_tools',
    label:"Industry tools",
    filter:'filter-rnt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'health',
    sub:'doctor',
    label:"Private Doctors",
    filter:'filter-hth',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'health',
    sub:'lab',
    label:"Laboratary",
    filter:'filter-hth',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'health',
    sub:'pharmacy',
    label:"Pharmacy",
    filter:'filter-hth',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/pcontrol",
    routerLink:"/business/hub",
    category:'pestcontrol',
    sub:'pest',
    label:"Pest Control",
    filter:'filter-pct',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/vehicles",
    routerLink:"/business/hub",
    category:'vehicles',
    sub:'car',
    label:"Cars",
    filter:'filter-veh',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'OTHER_VEH',
    label:"Other Vehicles",
    filter:'filter-veh',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'vehicles',
    sub:'s_parts',
    label:"Spare Parts",
    filter:'filter-veh',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'badminton',
    label:"Badmintion",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'tennis',
    label:"Tennis",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'equ',
    label:"Equipment",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'garage',
    sub:'motor',
    label:"Garage",
    filter:'filter-gar',
    viewTemplate:'common'
  }
]
   
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

  getResponse(){
    return this.success;
  }



}
