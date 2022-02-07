import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
declare let google: any;

@Component({
  selector: 'app-mapa-carro',
  templateUrl: './mapa-carro.page.html',
  styleUrls: ['./mapa-carro.page.scss'],
})
export class MapaCarroPage implements OnInit {
  googleAutoComplete = new google.maps.places.AutocompleteService();
  searchResults = new Array<any>();
  search: string;
  originMarker: any;
  destination: any;
  map: any;
  distance: any;
  time: any;
  price = 12.00;

  constructor(private ngZone: NgZone, private geolocation: Geolocation) { }




  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      console.log(resp);
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
    const lat = -23.5489;
    const lng = -46.6388;
    // Create a map centered in Pyrmont, Sydney (Australia).
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 15
    });
    this.map.markers = [];
    this.originMarker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Localização Atual'
    });

    // Search for Google's office in Australia.
    const request = {
      location: this.map.getCenter(),
      radius: '500',
      query: 'Google Sydney'
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, this.callback);
  }

  // Checks that the PlacesServiceStatus is OK, and adds a marker
  // using the place ID and location from the PlacesService.
  callback(results, status) {
    if (this.map && status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        map: this.map,
        place: {
          placeId: results[0].place_id,
          location: results[0].geometry.location
        }
      });
    }
  }



  event(event) {
    event.preventDefault();
  }



  mapsSearch() {
    if (!this.search.trim().length) { return; }
    this.googleAutoComplete.getPlacePredictions({ input: this.search }, (predictions, status) => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    }
    );


  }


  calcRoute(item: any) {
    this.search = '';
    const request = {
      location: this.map.getCenter(),
      radius: '500',
      query: item.description
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status) => {
      /* pegar lat long */
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      console.log(lat, lng);
      /* enviar centro do mapa para lat long */
      this.map.setCenter({ lat, lng });
      /* criar marcador */

      this.map.markers.push(new google.maps.Marker({
        map: this.map,
        position: { lat, lng }
      }));

      /* criar rota do origin marker ate o marker */
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.map);
      directionsService.route({
        origin: this.originMarker.getPosition(),
        destination: { lat, lng },
        travelMode: 'DRIVING'
      }, (response, status2) => {
        if (status2 === 'OK') {
          directionsDisplay.setDirections(response);
          /* pegar distancia de pontos */
          this.distance = response.routes[0].legs[0].distance.text;
          this.time = response.routes[0].legs[0].duration.text;
          let distanceCal = Number(this.distance);
          console.log(distanceCal);
          if (distanceCal > 5) {
            distanceCal = distanceCal - 5;
            this.price = distanceCal * 2;
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
      );
    });
  }
}
