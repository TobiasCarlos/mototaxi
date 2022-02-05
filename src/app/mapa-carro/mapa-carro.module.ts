import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaCarroPageRoutingModule } from './mapa-carro-routing.module';

import { MapaCarroPage } from './mapa-carro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaCarroPageRoutingModule
  ],
  declarations: [MapaCarroPage]
})
export class MapaCarroPageModule {}
