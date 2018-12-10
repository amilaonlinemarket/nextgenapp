import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  package: string;
  totalCost: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.findQueryParams().subscribe((data)=>{
      console.log('Identified selected package :%s',data);
      if(data =='basic'){
        this.totalCost = "Rs 100";
      }else if(data=='plus'){
        this.totalCost = "Rs 150";
      }else if(data=='pro'){
        this.totalCost = 'Rs 250';
      }else{
        this.totalCost = 'Rs 125';
      }
      // this.restclientService.request('get','edu',null,`root=education&sub=${data}`).subscribe((data)=>{
      //   this.loading = false;
      //   this.result =data.result
      //   console.log('Result set : %s',JSON.stringify(this.result))
      // },(err)=>{
      //   console.log('=======================error ====================== %s',err);
      //   console.error('Error :%s',err);
      // });
    });
  }

  findQueryParams():Observable<any>{
    console.log('Capturing query params :%s',this.route.queryParams); 
    this.route.queryParams
      .filter(params=>params.package)
      .subscribe(params=>{
        this.package = params.package;})
        console.log('Captured category :%s',this.package); 
      return Observable.of(this.package);
  }

}
