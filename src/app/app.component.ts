
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {


  // map: google.maps.Map;
  title = 'resolveProject';



  allNumbers: number[] = [];


  constructor() {
    // for (let insertNumbers = 0; insertNumbers <= 100; insertNumbers++) {
    //   this.allNumbers.push(insertNumbers);
    // }
  }
  ngAfterViewInit() {
  }
}
