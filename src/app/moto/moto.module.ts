import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotoPageRoutingModule } from './moto-routing.module';

import { MotoPage } from './moto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotoPageRoutingModule
  ],
  declarations: [MotoPage]
})
export class MotoPageModule {}
