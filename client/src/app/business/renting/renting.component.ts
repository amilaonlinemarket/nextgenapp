import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'rent',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.css']
})
export class RentingComponent implements OnInit {

  @Input() result:string[];
   @Input() dataSet:string;
   @Input() display:string;

  constructor() { }

  ngOnInit() {
  }

  filterObject(obj){
    return obj.filter(item=> item.display == 'F');
  }    
  
  jsonParse(data){
    //console.log(JSON.parse(data))
    return JSON.parse(data);
  }
}
