import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaCarroPage } from './mapa-carro.page';

const routes: Routes = [
  {
    path: '',
    component: MapaCarroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaCarroPageRoutingModule {}
