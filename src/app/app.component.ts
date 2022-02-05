import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate = []
  nome = "Sérgio Marinelli";
  constructor() {
    this.navigate = [
      {
        title: "Perfil",
        icon: "person-outline",
        url: "/perfil"
      },
      {
        title: "Home",
        icon: "car-outline",
        url: "/home"
      }
    ]
  }
}
