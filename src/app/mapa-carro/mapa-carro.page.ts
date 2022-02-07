import { Component, NgZone, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-mapa-carro',
  templateUrl: './mapa-carro.page.html',
  styleUrls: ['./mapa-carro.page.scss'],
})
export class MapaCarroPage implements OnInit {
  googleAutoComplete = new google.maps.places.AutocompleteService(); 
  searchResults = new Array<any>();
  search : string;
  originMarker: any;
  destination: any;
  map: any;
  distance: any;
  time: any;
  price = 12.00;

  constructor(private ngZone: NgZone) {


  }

  ngOnInit() {
    this.initialize();
  }

  // initMap(): void {
  //   //get position of user


  //     let map = new google.maps.Map(
  //       document.getElementById('map') as HTMLElement,
  //       {
  //         center: { lat: -34.9290, lng: 138.6010 },
  //         zoom: 15,
  //         //remove buttons
  //         disableDefaultUI: true,
  //         //uber style
  //         //type road
  //         mapTypeId: 'roadmap'
  //       }
  //     );






  // }

  initialize() {
    /* get my location*/
    navigator.geolocation.getCurrentPosition(position => {
      var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log( "teste", myLocation);
      var lat = myLocation.lat();
      var lng = myLocation.lng();

    // Create a map centered in Pyrmont, Sydney (Australia).
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 15
    });
    this.map.markers = [];
    this.originMarker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: this.map,
      title: 'Localização Atual'
    });

    // Search for Google's office in Australia.
    var request = {
      location: this.map.getCenter(),
      radius: '500',
      query: 'Google Sydney'
    };
  
    var service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, this.callback);
  });
  }
  
  // Checks that the PlacesServiceStatus is OK, and adds a marker
  // using the place ID and location from the PlacesService.
  callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
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
    if(!this.search.trim().length) return;
    this.googleAutoComplete.getPlacePredictions({ input: this.search }, (predictions, status) => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
      
    }
    );

       
   }


  calcRoute(item: any){
    this.search = "";
    var request = {
      location: this.map.getCenter(),
      radius: '500',
      query: item.description
    };
  
    var service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status) => {
      /* pegar lat long */
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      console.log(lat, lng)
      /* enviar centro do mapa para lat long */
      this.map.setCenter({lat: lat, lng: lng});
      /* criar marcador */

      this.map.markers.push(new google.maps.Marker({
        map: this.map,
        position: {lat: lat, lng: lng}
      }));

      /* criar rota do origin marker ate o marker */
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.map);
      directionsService.route({
        origin: this.originMarker.getPosition(),
        destination: {lat: lat, lng: lng},
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          /* pegar distancia de pontos */
          this.distance= response.routes[0].legs[0].distance.text;
          this.time = response.routes[0].legs[0].duration.text;
          var distanceCal = parseInt(this.distance)
          console.log(distanceCal)
          if(distanceCal>5){
            distanceCal = distanceCal - 5;
            this.price = distanceCal*2;
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
      );
    });
  }
}
