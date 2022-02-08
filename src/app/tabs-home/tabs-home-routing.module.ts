import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsHomePage } from './tabs-home.page';

const routes: Routes = [
  {
    path: '',
    component: TabsHomePage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'mapa',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mapa-carro/mapa-carro.module').then(
                (m) => m.MapaCarroPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs-home/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: TabsHomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsHomePageRoutingModule {}
