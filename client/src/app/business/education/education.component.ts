import { Component, OnInit ,Input} from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';

declare var $:any;

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() result:string[];
   @Input() dataSet:string;
   @Input() display:string;

  constructor() { }

  ngOnInit() {

    function showModel(){
      alert('cccccccc')
    }
  
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
      console.log('++++++++++++++++++++++++++result++++++++++++++ '+JSON.stringify(result));
      return result;
  }

  // processLocation(location,display){
  //   console.log('--------------------------ppppppppppppppppppppppp==========================')
  //   console.log('-------------ppppppppppppppppp-------------------------------'+display)
  //    var loc = location
  //    var displayLoc =JSON.parse(display);
  //    var cityList=[];
  //    var devisionList=[];
  //    console.log(loc+'>>>>>>>>>>>>>>>>>>>> '+displayLoc)
     
  //       location.forEach(element => {
  //         console.log(displayLoc.location+'!!!!!!!!!!!!!!!!!!!!!!!!!!!! '+JSON.stringify(element))
  //         if(displayLoc.location=='city'){
  //           cityList.push(element.city);
  //           console.log('cityList :%s',cityList)
  //         }else if(displayLoc.location=='devision'){
  //           cityList.push(element.devision);
  //       }
  //     });
  //       console.log('cccccccccccc : '+cityList);
  //       console.log('dddddddddddddd : '+devisionList)
  //       const uniqueValues = cityList.filter(this.unique);
  //       console.log('+++++++++++++++++++++++++++ :%s',uniqueValues.length  )
  //       console.log(uniqueValues.toString())
  //       return uniqueValues.toString();
  //    }

      unique = (value, index, self) => {
      return self.indexOf(value) === index;
  }

  isEmpty(data){
    return data =='' ? true:false;
  }

}
