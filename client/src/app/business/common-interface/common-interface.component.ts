import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { RestclientService} from '../../services/restclient.service';
import {UtilityService} from '../../services/utility.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

declare var $:any;


@Component({
  selector: 'app-common-interface',
  templateUrl: './common-interface.component.html',
  styleUrls: ['./common-interface.component.css']
})
export class CommonInterfaceComponent implements OnInit {

  cities = [];
  devisions :string[];
  result:string[];
  dataSet :string;
  public loading = false;
  selectedCity: string;
  error:boolean;
  template:string
  display:string;
  // domain=business;
  metaJSON={
    location:'city'
  };
  sortPrice =["education","property","accomadation","transport","services","pestcontrol","vehicles"];

  constructor(
      private restclientService:RestclientService,private route: ActivatedRoute,
      private utilityService: UtilityService
    ) {
     }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    $("#cityList li a").click(function (e) {
      e.preventDefault();
      var selText = $(this).text();
      $("#locationDropdown").html($(this).text() + '<i class="fa fa-sort-down" style="font-size:24px" aria-hidden="true"></i>');
      $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });
    //$('#list').click(function (event) { event.preventDefault(); $('#products .item').removeClass('grid-group-item'); $('#products .item').addClass('list-group-item'); });
    $('#grid').click(function (event) { 
      event.preventDefault(); $('#products .item').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); 
    });

    this.cities = this.utilityService.getCities();

    this.utilityService.findQueryParams(this.route.queryParams).subscribe((params) => {
      console.log('Request params :%s',JSON.stringify(params));
      this.restclientService.request('get', "business", null, `root=${params.category}&sub=${params.sub}`).subscribe((data) => {
        this.metaJSON.location = "city";
        this.display = JSON.stringify(this.metaJSON);
        this.loading = false;
        this.result = data.result;
        this.dataSet = JSON.stringify(this.result);
        console.log('loaded data :%s',this.dataSet);
        this.template = params.viewTemplate;
        // this.template = params.category;
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
    console.log('====================load muiti data ==================')
    this.devisions = this.utilityService.loadDevisions(city);
    console.log('====================devisions ================='+this.devisions)
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((params) => {
      var base = `category.root=${params.category}`;
      criteria = base.concat(`&category.sub=${params.sub}`);
      this.utilityService.findCity(city).subscribe((data) => {
        this.selectedCity = data.name
        console.log(this.selectedCity)
        if (city != 0) {
          this.metaJSON.location = "devision";
          this.display = JSON.stringify(this.metaJSON);
          criteria = criteria.concat(`&city=${data.name}`)
        } else {
          this.metaJSON.location = "city";
          this.display = JSON.stringify(this.metaJSON);
        }
        console.log('Initiating rest service - type:,%s', params.category)
        this.restclientService.request('get', 'business', null, criteria).subscribe((data) => {
          this.result = data.result
          this.dataSet = JSON.stringify(this.result);
          this.loading = false;
          console.log('Result set : %s', JSON.stringify(this.dataSet))
        }, (err) => {
          console.error('Error occur :%s', err);
          this.error = true;
          this.loading = false;
        });
      });
    });
  }

  loadData(devision: string) {
    this.loading = true;
    this.error = false;
    var criteria;

    this.selectedCity = this.utilityService.displaySelectedCity(this.selectedCity, devision);
    this.utilityService.findQueryParams(this.route.queryParams).subscribe((params) => {
      var base = `category.root=${params.category}`;
      criteria = base.concat(`&category.sub=${params.sub}&devision=${devision}`);
      console.log('criteira :%s', criteria)
      this.restclientService.request('get', 'business', null, criteria).subscribe((data) => {
        this.metaJSON.location = "devision";
        this.display = JSON.stringify(this.metaJSON);
        this.result = data.result
        this.dataSet = JSON.stringify(this.result);
        this.loading = false;
        console.log('Result set : %s', JSON.stringify(this.result))
      }, (err) => {
        console.error('Error :%s', err);
        this.error = true;
        this.loading = false;
      });
    });
  }

  sortBy(sort: number) {
    this.loading = true;
    this.error = false;
    var criteria;

    this.utilityService.findQueryParams(this.route.queryParams).subscribe((params) => {
      var base = `root=${params.category}`;
      criteria = base.concat(`&sub=${params.sub}`);
      this.metaJSON.location = "city";
      this.display = JSON.stringify(this.metaJSON);
      if (this.selectedCity != undefined) {
        criteria = criteria.concat(`&city=${this.selectedCity.split(">")[0]}`);
        if (this.selectedCity.split(">")[1] != undefined) {
          criteria = criteria.concat(`&devision=${this.selectedCity.split(">")[1]}`);
          this.metaJSON.location = "devision";
          this.display = JSON.stringify(this.metaJSON);
        }
      }
      criteria = criteria.concat(`&sort=${sort}`);
      console.log('criteria list :%s', criteria);
      this.restclientService.request('get', 'business', null, criteria).subscribe((data) => {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& '+data.result)
        this.result = data.result
        this.loading = false;
        this.error = false;
        console.log('Result set : %s', JSON.stringify(this.result))
      }, (err) => {
        this.error = true;
        this.loading = false;
        console.error('Error :%s', err);
      });
    });
  }

  enableSort(template){
    return this.sortPrice.indexOf(template);
  }
  // onClick() {
  //   console.log(this.myType);
  //   this.myType = this.myType === 'myedu' ? 'myhouse' : 'myedu';
  // }

}
