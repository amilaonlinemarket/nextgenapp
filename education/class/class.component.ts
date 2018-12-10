import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { RestclientService} from '../../../services/restclient.service';
import {UtilityService} from '../../../services/utility.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

declare var $:any;

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  cities = [];
  result=[];
  devisions =[];
  public loading = false;
  selectedCity: string;
  error:boolean;
  type:any ='edu';
  category='education';
  displayLocation:string;
  
  constructor(
    private restclientService:RestclientService,private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
   }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip(); 
    $("#cityList li a").click(function (e) {
      e.preventDefault();
      var selText = $(this).text();
      $("#locationDropdown").html($(this).text() + '<i class="fa fa-sort-down" style="font-size:24px" aria-hidden="true"></i>');
      $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });

    //$('#list').click(function (event) { event.preventDefault(); $('#products .item').removeClass('grid-group-item'); $('#products .item').addClass('list-group-item'); });
    $('#grid').click(function (event) { event.preventDefault(); $('#products .item').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); });

    this.error = false;
    this.loading = true;
    this.cities = this.utilityService.getCities();

    this.utilityService.findQueryParams(this.route.queryParams).subscribe((data) => {
      this.displayLocation ='city';
      this.restclientService.request('get', this.type, null, `root=${this.category}&sub=${data}`).subscribe((data) => {
        this.loading = false;
        this.result = data.result
        console.log(JSON.stringify(this.result))
      }, (err) => {
        this.loading = false;
        this.error = true;
        console.error('Error loading classes :%s', err);
      });
    });
  }
  
  loadMultiData(city: number) {
    this.loading = true;
    this.error = false;
    var criteria;
    var base = `category.root=${this.category}`;
    this.devisions = JSON.parse(this.utilityService.loadDevisions(city));
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((sub) => {
      criteria = base.concat(`&category.sub=${sub}`);
      this.utilityService.findCity(city).subscribe((data) => {
        this.selectedCity = data.name
        console.log('cccccccccccccccccccccccccccc :%s',city);
        if (city != 0) {
          console.log('ccccccccccccxddddddddddddddddcccccccccccccccc :%s',city);
          this.displayLocation='devision';
          criteria = criteria.concat(`&city=${data.name.toLowerCase()}`)
        }else{
          console.log('cccccxxxxxxxxxxxxxxxxxxccccccccccccccccccccccc :%s',city);
          this.displayLocation='city';
        }
        this.restclientService.request('get', this.type, null, criteria).subscribe((data) => {
          this.result = data.result
          this.loading = false;
          console.log('Result set : %s', JSON.stringify(this.result))
        }, (err) => {
          this.error = true;
          console.error('Error occur :%s', err);
        });
      });
    });
  }

  loadData(devision: string) {
    this.loading = true;
    this.error = false;
    var criteria;

    this.selectedCity = this.utilityService.displaySelectedCity(this.selectedCity, devision);
    var base = `category.root=${this.category}`;
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((sub) => {
      criteria = base.concat(`&category.sub=${sub}&devision=${devision.toLowerCase()}`);
      console.log('criteira :%s', criteria)
      this.restclientService.request('get', this.type, null, criteria).subscribe((data) => {
        this.result = data.result
        this.loading = false;
        console.log('Result set : %s', JSON.stringify(this.result))
      }, (err) => {
        console.error('Error :%s', err);
        this.error = true;
      });
    });
  }

  sortBy(sort:number){
    this.loading = true;
    this.error =false;
    var criteria;

    var base=`root=${this.category}`;
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((sub)=>{
       criteria = base.concat(`&sub=${sub}`);
       if(this.selectedCity!=undefined){
        criteria = criteria.concat(`&city=${this.selectedCity.split('→')[0].toLowerCase()}`);
        if(this.selectedCity.split('→')[1]!=undefined){
          criteria = criteria.concat(`&devision=${this.selectedCity.split('→')[1].toLowerCase()}`);
        }
       }
       criteria = criteria.concat(`&sort=${sort}`);
       console.log('criteria list :%s',criteria);
       this.restclientService.request('get',this.type,null,criteria).subscribe((data)=>{
          this.result =data.result
          this.loading = false;
          console.log('Result set : %s',JSON.stringify(this.result))
        },(err)=>{
          this.error =false;
          console.error('Error :%s',err);
        });
    });    
  }

  filterObject(obj){
    return obj.filter(item=> item.display == 'F');
  }                     
}


