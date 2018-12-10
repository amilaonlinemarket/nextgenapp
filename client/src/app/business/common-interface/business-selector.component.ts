import { Component, Input ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { RestclientService} from '../../services/restclient.service';
import {UtilityService} from '../../services/utility.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'business',
  template: `<div [ngSwitch]="type">
     <education *ngSwitchCase="'education'" dataSet="{{dataSet}}" display="{{display}}"></education>
     <common  *ngSwitchCase="'common'"  dataSet="{{dataSet}}" display="{{display}}"></common>
     <property  *ngSwitchCase="'property'"  dataSet="{{dataSet}}" display="{{display}}"></property>
     <printing  *ngSwitchCase="'printing'"  dataSet="{{dataSet}}" display="{{display}}"></printing>
     <sports  *ngSwitchCase="'sports'"  dataSet="{{dataSet}}" display="{{display}}"></sports>   
     <health  *ngSwitchCase="'health'"  dataSet="{{dataSet}}" display="{{display}}"></health>
     <transport  *ngSwitchCase="'transport'"  dataSet="{{dataSet}}" display="{{display}}"></transport> 
     <accomadation  *ngSwitchCase="'accomadation'"  dataSet="{{dataSet}}" display="{{display}}"></accomadation>
     <rent  *ngSwitchCase="'rent'"  dataSet="{{dataSet}}" display="{{display}}"></rent>
     <pestcontrol  *ngSwitchCase="'pestcontrol'"  dataSet="{{dataSet}}" display="{{display}}"></pestcontrol>

     
  </div>`
})
export class BusinessSelectorComponent implements OnInit {

    @Input() type: string;
    @Input() display:string;
    @Input() dataSet:string;

    ngOnInit(): void {
        console.log('Identifing template :%s',this.type);
    }
   
//   @Input() name: string;
}