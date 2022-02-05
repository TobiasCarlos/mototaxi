import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoPage } from './moto.page';

const routes: Routes = [
  {
    path: '',
    component: MotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoPageRoutingModule {}
