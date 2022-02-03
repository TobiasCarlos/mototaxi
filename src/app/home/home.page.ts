import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cashback = "0,00"
  formCorrida = {
    sexo: 'mf'
  }
  constructor() {}
  selectSexo(sexo){
    this.formCorrida.sexo = sexo;
  }
}
