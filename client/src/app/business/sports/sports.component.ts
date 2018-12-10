import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

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
