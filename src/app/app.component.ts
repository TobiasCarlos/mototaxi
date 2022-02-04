import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate = []
  constructor() {
    this.navigate = [
      {
        title: "mapa",
        icon: "map",
        url: "/mapa"
      }
    ]
  }
}
