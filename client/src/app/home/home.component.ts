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
    console.log('-----------------------------home-------------------------------')

    $('#portfolioId').hide();

     this.businessList =[{
      image:"./assets/img/portfolio/OL.jpg",
      routerLink:"/business/hub",
      category:'education',
      sub:'o/l',
      label:"O/L classes",
      filter:'filter-edu',
      viewTemplate:'education'
    },
    {
    image:"./assets/img/portfolio/AL.jpg",
      routerLink:"/business/hub",
      category:'education',
      sub:'a/l',
      label:"A/L classes",
      filter:'filter-edu',
      viewTemplate:'education'
  },
  {
    image:"./assets/img/portfolio/IT.jpg",
      routerLink:"/business/hub",
      category:'education',
      sub:'it',
      label:"IT Education",
      filter:'filter-edu',
      viewTemplate:'education'
  },
  {
  image:"./assets/img/portfolio/Dancing.jpg",
      // routerLink:"/edu/classes",
      routerLink:"/business/hub",
      category:'education',
      sub:'dancing',
      label:"Dancing",
      filter:'filter-edu',
      viewTemplate:'education'
  },
  {
    image:"./assets/img/portfolio/priEdu.jpg",
        routerLink:"/business/hub",
        category:'education',
        sub:'primary',
        label:"Primary Education",
        filter:'filter-edu',
        viewTemplate:'education'
    },
  {
    image:"./assets/img/portfolio/englishEdu.jpg",
    routerLink:"/business/hub",
    category:'education',
    sub:'english',
    label:"English Classes",
    filter:'filter-edu',
    viewTemplate:'education'
  },
  {
    image:"./assets/img/portfolio/beauty_culture.jpg",
    routerLink:"/business/hub",
    category:'education',
    sub:'beauty',
    label:"Beauty Culture Classes",
    filter:'filter-edu',
    viewTemplate:'education'
  },
  {
    image:"./assets/img/portfolio/fruit_vegi.jpg",
      routerLink:"/business/hub",
      category:'agri',
      sub:'fv',
      label:"Fruit & Veg Suppliers",
      filter:'filter-agr',
      viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/house.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'house',
    label:"Houses",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/annex.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'room',
    label:"Rooms & Annexes",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/building.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'building',
    label:"Buildings",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/land.jpg",
    // routerLink:"/business/house",
    routerLink:"/business/hub",
    category:'property',
    sub:'land',
    label:"Land",
    filter:'filter-pro',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/building_constructor.jpg",
    // routerLink:"/business/construction",
    routerLink:"/business/hub",
    category:'construction',
    sub:'buildCon',
    label:"Building contractors",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/soil_suppliers.jpg",
    // routerLink:"/business/construction",
    routerLink:"/business/hub",
    category:'construction',
    sub:'soil',
    label:"Soil suppilers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/hardware.jpg",
    // routerLink:"/business/construction",
    routerLink:"/business/hub",
    category:'construction',
    sub:'hardware',
    label:"Hardware & Raw Mat..",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/architects.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'archi',
    label:"Architects",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'engCon',
    label:"Enginner & Consultants",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/electrical_wiring.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'eleWir',
    label:"Electrical Wiring",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/mason.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'mason',
    label:"Mason",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/plumbers.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'plumber',
    label:"Plumbers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/roof_workers.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'wrw',
    label:"Wood & Roof Workers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/painters.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'paint',
    label:"Painters",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/timber_suppliers.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'timber',
    label:"Timber suppliers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/concrete_workers.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'concrete',
    label:"Concrete workers",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/construction_tools.jpg",
    routerLink:"/business/hub",
    category:'construction',
    sub:'rent',
    label:"Rent Construction tools",
    filter:'filter-con',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/hotel.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'hotel',
    label:"Hotels",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/holiday_resort.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'resorts',
    label:"Holiday Resorts",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/guest_house.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'gh',
    label:"Guest Houses",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/hostel.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'hostels',
    label:"Hostels",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/holiday_bungolow.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'hb',
    label:"Holiday Bungalows",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  // {
  //   image:"./assets/img/portfolio/app1.jpg",
  //   // routerLink:"/business/acco",
  //   routerLink:"/business/hub",
  //   category:'accomadation',
  //   sub:'rh',
  //   label:"Rest House",
  //   filter:'filter-aco',
  //   viewTemplate:'common'
  // },
  {
    image:"./assets/img/portfolio/room.jpg",
    // routerLink:"/business/acco",
    routerLink:"/business/hub",
    category:'accomadation',
    sub:'rooms',
    label:"Rooms",
    filter:'filter-aco',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/digital_printing.jpg",
    // routerLink:"/business/printing",
    routerLink:"/business/hub",
    category:'printing',
    sub:'digiPrint',
    label:"Digital printing",
    filter:'filter-prt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/transport",
    routerLink:"/business/hub",
    category:'rent',
    sub:'rent',
    label:"Rent",
    filter:'filter-reh',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/app1.jpg",
    // routerLink:"/business/transport",
    routerLink:"/business/hub",
    category:'rent',
    sub:'hire',
    label:"Hire",
    filter:'filter-reh',
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
    // routerLink:"/business/renting",
    routerLink:"/business/hub",
    category:'rent',
    sub:'ins_tools',
    label:"Industry tools",
    filter:'filter-rnt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/private_doctors.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'health',
    sub:'doctor',
    label:"Private Doctors",
    filter:'filter-hth',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/lab.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'health',
    sub:'lab',
    label:"Laboratary",
    filter:'filter-hth',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/pharmacy.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'health',
    sub:'pharmacy',
    label:"Pharmacy",
    filter:'filter-hth',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/bridail_dressing.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'wed',
    sub:'bridal',
    label:"Bridal Dressing",
    filter:'filter-wed',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/flower_deco.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'wed',
    sub:'flower',
    label:"Flower Decos",
    filter:'filter-wed',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/photography.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'wed',
    sub:'photography',
    label:"Protography",
    filter:'filter-wed',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/groom_wear.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'wed',
    sub:'groomswear',
    label:"Groomswear",
    filter:'filter-wed',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/cake_deco.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'wed',
    sub:'cake',
    label:"Cake creators",
    filter:'filter-wed',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/traditional_dancers.jpg",
    // routerLink:"/business/health",
    routerLink:"/business/hub",
    category:'wed',
    sub:'trad',
    label:"Traditional Dancers",
    filter:'filter-wed',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/pest_control.jpg",
    // routerLink:"/business/pcontrol",
    routerLink:"/business/hub",
    category:'pestcontrol',
    sub:'pest',
    label:"Pest Control",
    filter:'filter-pct',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/vehicle.jpg",
    // routerLink:"/business/vehicles",
    routerLink:"/business/hub",
    category:'auto',
    sub:'vehicles',
    label:"Vehicles",
    filter:'filter-auto',
    viewTemplate:'common'
  },
  // {
  //   image:"./assets/img/portfolio/automotive.jpg",
  //   routerLink:"/business/hub",
  //   category:'auto',
  //   sub:'AutoServices',
  //   label:"Automotive Services",
  //   filter:'filter-auto',
  //   viewTemplate:'common'
  // },
  {
    image:"./assets/img/portfolio/garage.jpg",
    routerLink:"/business/hub",
    category:'auto',
    sub:'mechGar',
    label:"Mechanics & Garages",
    filter:'filter-auto',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/motor_sctoor.jpg",
    routerLink:"/business/hub",
    category:'auto',
    sub:'motorSco',
    label:"Motorcycles & Scooters",
    filter:'filter-auto',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/spare_parts.jpg",
    routerLink:"/business/hub",
    category:'auto',
    sub:'partAcc',
    label:"Parts & Accessories",
    filter:'filter-auto',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/service_station.jpg",
    // routerLink:"/business/serSation",
    routerLink:"/business/hub",
    category:'auto',
    sub:'serStation',
    label:"Service Sation",
    filter:'filter-auto',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/badminton.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'badminton',
    label:"Badmintion",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/tennis.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'tennis',
    label:"Tennis",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/swimming.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'swimming',
    label:"Swimming",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/water_sport.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'ws',
    label:"Water Sports",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  // {
  //   image:"./assets/img/portfolio/app1.jpg",
  //   routerLink:"/business/hub",
  //   category:'sports',
  //   sub:'hunting',
  //   label:"Hunting",
  //   filter:'filter-spt',
  //   viewTemplate:'common'
  // },
  {
    image:"./assets/img/portfolio/sports_equ.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'equ',
    label:"Equipments",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/gym.jpg",
    routerLink:"/business/hub",
    category:'sports',
    sub:'gym',
    label:"Gym & Fitness",
    filter:'filter-spt',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/beauty_salon.jpg",
    routerLink:"/business/hub",
    category:'beauty',
    sub:'saloon',
    label:"Beauty Sallon",
    filter:'filter-bea',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/spa.jpg",
    routerLink:"/business/hub",
    category:'beauty',
    sub:'spa',
    label:"Spa",
    filter:'filter-bea',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/pets.jpg",
    routerLink:"/business/hub",
    category:'animal',
    sub:'pets',
    label:"Pets",
    filter:'filter-ani',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/pet_accessories.jpg",
    routerLink:"/business/hub",
    category:'animal',
    sub:'acc',
    label:"Accessories",
    filter:'filter-ani',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/pet_food.jpg",
    routerLink:"/business/hub",
    category:'animal',
    sub:'petfood',
    label:"Pet Food",
    filter:'filter-ani',
    viewTemplate:'common'
  },
  {
    image:"./assets/img/portfolio/veterinary.jpg",
    routerLink:"/business/hub",
    category:'animal',
    sub:'vet',
    label:"Veterinary Services",
    filter:'filter-ani',
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
