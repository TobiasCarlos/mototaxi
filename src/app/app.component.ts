import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate = [];
  nome = 'Sérgio Marinelli';
  numero = '37-999510833';
  constructor() {
    this.navigate = [
      {
        title: 'Perfil',
        icon: 'person-outline',
        url: '/perfil',
      },
      {
        title: 'Home',
        icon: 'car-outline',
        url: '/tabs-home',
      },
      {
        title: 'Mensagens',
        icon: 'chatbox-ellipses-outline',
        url: '/messages',
      },
    ];
  }
}
