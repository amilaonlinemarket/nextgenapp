import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'myedu',
  templateUrl: './myedu.component.html',
  styleUrls: ['./myedu.component.css']
})
export class MyeduComponent implements OnInit {
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
    return JSON.parse(data);
  }


}
