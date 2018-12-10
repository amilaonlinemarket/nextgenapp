import { Component, OnInit } from '@angular/core';
import { RestclientService} from '../services/restclient.service';

@Component({
  selector: 'app-ngbd-dropdown-basic',
  templateUrl: './ngbd-dropdown-basic.component.html',
  styleUrls: ['./ngbd-dropdown-basic.component.css']
})
export class NgbdDropdownBasicComponent  {
  cities = [];
  result;

  constructor(private restclientService:RestclientService){}

//   loadCities(city: string) {
//     if (city) {
//       if(city !='all'){
//         if(city=='colombo'){
//           this.cities= ['colombo01','colombo02','colombo03','colombo04','colombo05','colombo06','colombo07','colombo08'];
//         }else if(city=='gampaha'){
//           this.cities= ['ja ela','seeduwa','raddolugama','katana','minuwangoda'];
//         }
//     }
//   }
// }

// filterBycriteria(criteria){
//   console.log('selected criteria :%s',criteria);
//   criteria='location=seeduwa';
//   this.restclientService.request('get','edu',null,criteria).subscribe((data)=>{
//     this.result =data.result
//     console.log('getItems ..................... %s',JSON.stringify(this.result))
//   },(err)=>{
//     console.error('Error :%s',err);
//   });
// }
  // loadCities(city:string){
  //   console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk %s',city)
  //   var cities =[]
  //   if(city !='all'){
  //     if(city=='colombo'){
  //       cities= ['colombo01','colombo02'];
  //     }else if(city=='gampaha'){
  //       cities= ['ja ela','seeduwa'];
  //     }
  //   }
  //   return cities;
  // }


}
