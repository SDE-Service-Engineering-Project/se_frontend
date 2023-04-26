import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass'],
})
export class MapsComponent implements OnInit {
  // default is vienna
  center: google.maps.LatLngLiteral = {
    lat: 48.207,
    lng: 16.37,
  };
  options: google.maps.MapOptions = {
    zoom: 7,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 47.668926330343105, lng: 15.314201765121096 },
    { lat: 47.99343858124293, lng: 10.040764265121096 },
    { lat: 50.62840673880935, lng: 16.368889265121094 },
    { lat: 46.41118736166947, lng: 18.478264265121094 },
    { lat: 50.40486482274211, lng: 9.952873640121096 },
    { lat: 52.37880720551092, lng: 9.161858015121096 },
    { lat: 51.81186381050894, lng: 12.457756452621096 },
    { lat: 49.95460112781463, lng: 11.359123640121096 },
    { lat: 49.500087553393854, lng: 17.072014265121094 },
    { lat: 50.01111626395551, lng: 13.688225202621096 },
    { lat: 46.953849425054905, lng: 12.853264265121096 },
    { lat: 45.67915390485142, lng: 11.227287702621096 },
    { lat: 48.43268742988301, lng: 20.455803327621094 },
    { lat: 50.71196214828071, lng: 19.049553327621094 },
    { lat: 50.01111626395551, lng: 19.972404890121094 },
    { lat: 36.043575555403685, lng: 111.50640958113333 },
    { lat: 29.70120569602146, lng: 109.22125333113333 },
    { lat: 34.17434600655804, lng: 98.14703458113333 },
    { lat: 43.37032159336098, lng: -114.34201681413636 },
    { lat: 44.25818784533602, lng: -102.38889181413636 },
    { lat: 37.20977412847751, lng: -94.65451681413636 },
    { lat: 35.36800460178879, lng: -113.63889181413636 },
    { lat: 39.68732642405525, lng: -107.83811056413636 },
    { lat: 33.62971935176752, lng: -102.21311056413636 },
    { lat: 30.955476463849863, lng: -87.79904806413636 },
    { lat: 34.213170117758715, lng: -78.83420431413636 },
    { lat: 40.76099356620562, lng: -84.81076681413636 },
    { lat: 42.985768236991106, lng: -93.24826681413636 },
    { lat: 38.32140865626255, lng: -87.27170431413636 },
    { lat: 42.59879410883086, lng: -74.61545431413636 },
  ];

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          }
        },
        (error) => console.log(error)
      );
    }
  }
}
