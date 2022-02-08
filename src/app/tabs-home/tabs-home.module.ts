import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';

import { TabsHomePageRoutingModule } from './tabs-home-routing.module';

import { TabsHomePage } from './tabs-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsHomePageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [TabsHomePage],
})
export class TabsHomePageModule {}
