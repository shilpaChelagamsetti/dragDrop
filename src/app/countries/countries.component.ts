import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, AfterViewInit  {
  countries: any = [];
  check = 0;
  checkpercent: any;
  checkColorOuter: any;
  checkColorInner: any;

  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;
  coordinates: any;

  marker: any;
  constructor(private commonservice: CommonService, private actRoute: ActivatedRoute, private route: Router) { }

  Drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  setMarker(coordinates, Map1) {
    this.marker = new google.maps.Marker({
      position: coordinates,
      map: Map1,
    });
    // console.log('entered  this.marker', this.marker);
  }
  Locate(i) {
    event.stopPropagation();
    this.countries.forEach(element => {
      element.displaymap = false;
    });
    // console.log('entered locate on mapsi......', i, this.countries[i], this.lat, this.lng);
    this.countries[i].displaymap = true;
    this.coordinates = new google.maps.LatLng(this.countries[i].latlng[0], this.countries[i].latlng[1]);
    this.setMarker(this.coordinates, this.map);
    // console.log('entered  this.marker i......',  this.marker );
    // console.log('entered  this.coordinates i......',  this.coordinates );
    // console.log('entered  this.mapOptions i......',  this.mapOptions );
    this.mapInitializer();
  }
  mapInitializer() {
    const mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      zoom: 8,
    };
    console.log('entered  this.mapInitializer mapOptions value......',  mapOptions, this.map );

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    // this.marker.setMap(this.map);
    this.setMarker(this.coordinates , this.map);

   }
  openDetails(country) {
    console.log('entered opendetails i......', country, country.name );
    this.route.navigate([`/countrydetail/${country.name}`]);
  }
  ChangeTitle(country) {
console.log('entered chage title', country);
event.stopPropagation();
  }
  ngOnInit() {

    this.actRoute.data.subscribe(data => {

      this.countries = data.RouteResolver;
      this.countries.forEach(element => {
        element.displaymap = false;
      });
      // console.log('countries', this.countries);
    });

    // for (this.check = 1; this.check <= this.countries.length; this.check++) {
    //   this.checkpercent = (this.check / this.countries.length) * 100;
    //   if (this.checkpercent < '30') {
    //     this.checkColorOuter = '#dc3545';
    //     this.checkColorInner = '#f1949d';
    //   } else {
    //     this.checkColorOuter = '#78C000';
    //     this.checkColorInner = '#C7E596';
    //   }

    // }
    // this.commonservice.getCountries().subscribe(countryData => {
    //   console.log('countries data', countryData);
    //   this.countries = countryData;
    // });

  }
  ngAfterViewInit() {
    this.mapInitializer();
  }
}
