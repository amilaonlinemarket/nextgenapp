import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'pestcontrol',
  templateUrl: './pestcontrol.component.html',
  styleUrls: ['./pestcontrol.component.css']
})
export class PestcontrolComponent implements OnInit {


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
