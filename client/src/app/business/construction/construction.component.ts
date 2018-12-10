import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.css']
})
export class ConstructionComponent implements OnInit {
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
