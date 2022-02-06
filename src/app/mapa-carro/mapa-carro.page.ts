import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Environment, GoogleMap, GoogleMaps } from '@ionic-native/google-maps';
import { LoadingController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
declare var google: any;

@Component({
  selector: 'app-mapa-carro',
  templateUrl: './mapa-carro.page.html',
  styleUrls: ['./mapa-carro.page.scss'],
})
export class MapaCarroPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  googleAutoComplete = new google.maps.places.AutocompleteService(); 
  searchResults = new Array<any>();
  search : string;
  originMarker: any;
  destination: any;
  loading: any;
  map: GoogleMap;

  constructor(private ngZone: NgZone, private platform: Platform, private loadingCtrl: LoadingController) {


  }

  ngOnInit() {
      this.mapElement = this.mapElement.nativeElement;
      this.mapElement.style.width = this.platform.width() + 'px';
      this.mapElement.style.height = this.platform.height() + 'px';
      this.loadMap()

  }
 async loadMap(){
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    await this.loading.present();
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC6mlxi0aD4sju5ZPj5YDxKyDiQs_k-3RY',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyC6mlxi0aD4sju5ZPj5YDxKyDiQs_k-3RY'
    });

    this.map = GoogleMaps.create(this.mapElement)

  }
  initMap(): void {
    //get position of user


      let map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: -34.9290, lng: 138.6010 },
          zoom: 15,
          //remove buttons
          disableDefaultUI: true,
          //uber style
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f5f5',
                  lightness: '-10',
                },
              ],
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#a0a4a5',
                },
              ],
            },
            {
              featureType: 'administrative.province',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#62838e',
                },
              ],
            },
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#dde3e3',
                },
              ],
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#3f4a51',
                },
                {
                  weight: '0.30',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'simplified',
                },
              ],
            },
            {
              featureType: 'poi.attraction',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'poi.business',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'poi.government',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              elementType: 'all',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'poi.school',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [
                {
                  saturation: '-100',
                },
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#bbcacf',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  lightness: '0',
                },
                {
                  color: '#bbcacf',
                },
                {
                  weight: '0.50',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffffff',
                },
              ],
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#a9b4b8',
                },
              ],
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [
                {
                  invert_lightness: true,
                },
                {
                  saturation: '-7',
                },
                {
                  lightness: '3',
                },
                {
                  gamma: '1.80',
                },
                {
                  weight: '0.01',
                },
              ],
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#a3c7df',
                },
              ],
            },
           
          ],
        }
      );




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
    this.search = ""
    console.log(item)
  }
}
