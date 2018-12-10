import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {


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
