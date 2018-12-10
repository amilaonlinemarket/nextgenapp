import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'accomadation',
  templateUrl: './accomadation.component.html',
  styleUrls: ['./accomadation.component.css']
})
export class AccomadationComponent implements OnInit {
  @Input() result:string[];
  @Input() dataSet:string;
  @Input() display:string;

 constructor() { }

 ngOnInit() {
 }

 filterObject(obj){
  return obj.filter(item=> item.display == 'F');
}    

checkLength(data){
  var result = JSON.parse(data)
  console.log('Check the length of business list :%s',result.length);
  return result.length==0 ? true:false;
}

jsonParse(data,display){
   var result = JSON.parse(data)
   var displayLoc =JSON.parse(display);
   console.log('Parsing business result');
    result.forEach(obj=>{
      var cityList=[];
      obj.location.forEach(element => {
        if(displayLoc.location=='city'){
          cityList.push(element.city);
        }else if(displayLoc.location=='devision'){
          cityList.push(element.devision);
      }
    });
    const uniqueLocation = cityList.filter(this.unique);
    console.log('Found unique location :%s',uniqueLocation.toString())
    obj['uniqueLoc']=uniqueLocation.toString();
    });
    return result;
}
    unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

isEmpty(data){
  return data =='' ? true:false;
}

}
