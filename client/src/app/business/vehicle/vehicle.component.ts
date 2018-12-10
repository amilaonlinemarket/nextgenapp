import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { RestclientService} from '../../services/restclient.service';
import {UtilityService} from '../../services/utility.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

declare var $:any
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  cities = [];
  result=[];
  devisions =[];
  category: string;
  selectedCity: string;
  public loading = false;
 

  constructor(
    private restclientService:RestclientService,private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
   }

  ngOnInit() {
    console.log("Initiating house component !!!")
    this.loading = true;
    
    $('#list').click(function(event){event.preventDefault();$('#products .item').removeClass('grid-group-item');$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
    
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((data)=>{
      console.log('Before executing rest service')
      this.restclientService.request('get','vehicle',null,`root=vehicle&sub=${data}`).subscribe((data)=>{
        this.loading = false;
        this.result =data.result
        console.log('Result set : %s',JSON.stringify(this.result))
      },(err)=>{
        console.log('=======================error ====================== %s',JSON.stringify(err));
        console.error('Error :%s',err);
      });
    });
    this.cities = this.utilityService.getCities();
  }

  findCity(id):Observable<any>{
    return this.utilityService.findCity(id);
  }

  loadMultiData(city: number) {
    console.log('Retriving citis and data :%s',city)
    this.loading = true;
    var criteria;
    var base=`category.root=property`;
    this.devisions =this.utilityService.loadDevisions(city) ;
    console.log('Load devisions :%s',JSON.stringify(this.devisions));
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((sub)=>{
      console.log(base);
      criteria =base.concat(`&category.sub=${sub}`);
      this.findCity(city).subscribe((data)=>{
        this.selectedCity=data.name
        if(city !=0){
          criteria = criteria.concat(`&city=${data.name.toLowerCase()}`)
        }
        console.log('criteira :%s',criteria)
        this.restclientService.request('get','vehicle',null,criteria).subscribe((data)=>{
          this.result =data.result
          this.loading = false;
          console.log('Result set : %s',JSON.stringify(this.result))
        },(err)=>{
          console.error('Error :%s',err);
          // this.error =true;
        });
      });
    });
}

  loadData(devision: string) { 
    if(this.selectedCity.split(">")[1] !=undefined){
      this.selectedCity = this.selectedCity.split(">")[0];
      console.log(this.selectedCity);
      this.selectedCity = this.selectedCity.concat(" >");
      this.selectedCity = this.selectedCity.concat(devision);
    }else{
      this.selectedCity = this.selectedCity.concat(" >");
      this.selectedCity = this.selectedCity.concat(devision);
    }
    this.loading = true;
    var criteria;
    var base = `category.root=property`;
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((sub)=>{
      console.log(base);
      criteria = base.concat(`&category.sub=${sub}&devision=${devision.toLowerCase()}`);
      console.log('criteira :%s', criteria)
      this.restclientService.request('get', 'vehicle', null, criteria).subscribe((data) => {
        this.result = data.result
        this.loading = false;
        console.log('Result set : %s', JSON.stringify(this.result))
      }, (err) => {
        console.error('Error :%s', err);
      });
    });
  }

  sortBy(sort:number){
    console.log('sssssssssssssssssssssss %s',this.selectedCity);
    this.loading = true;
    var criteria;
    var sortOption;
    var base=`root=property`;

    this.utilityService.findQueryParams(this.route.queryParams).subscribe((sub)=>{
       criteria = base.concat(`&sub=${sub}`);
       if(this.selectedCity!=undefined){
        criteria = criteria.concat(`&city=${this.selectedCity.split(">")[0].toLowerCase()}`);
        if(this.selectedCity.split(">")[1]!=undefined){
          criteria = criteria.concat(`&devision=${this.selectedCity.split(">")[1].toLowerCase()}`);
        }
       }
       criteria = criteria.concat(`&sort=${sort}`);
       console.log('criteria list :%s',criteria);
       this.restclientService.request('get','vehicle',null,criteria).subscribe((data)=>{
          this.result =data.result
          this.loading = false;
          console.log('Result set : %s',JSON.stringify(this.result))
        },(err)=>{
          console.error('Error :%s',err);
        });
    });    
  }

  filterObject(obj){
    return obj.filter(item=> item.display == 'F');
  }

}
