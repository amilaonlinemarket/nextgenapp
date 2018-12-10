import { Component, OnInit,Input } from '@angular/core';

declare var $:any;

@Component({
  selector: 'printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit {

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
