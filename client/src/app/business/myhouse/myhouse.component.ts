import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'myhouse',
  templateUrl: './myhouse.component.html',
  styleUrls: ['./myhouse.component.css']
})
export class MyhouseComponent implements OnInit {
  
  @Input() result: any;
  
  constructor() { }

  ngOnInit() {
  }

}
