import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit {

  // default is vienna
  center: google.maps.LatLngLiteral = {
    lat: 48.207,
    lng: 16.37
  };
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoom: 7
  }


  ngOnInit(): void {
    this.getLocation()
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
        },
        (error) => console.log(error));
    }
  }
}
