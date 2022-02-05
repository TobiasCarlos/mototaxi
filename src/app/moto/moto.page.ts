import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.page.html',
  styleUrls: ['./moto.page.scss'],
})
export class MotoPage {
  cashback = "0,00"
  formCorrida = {
    sexo: 'mf'
  }

  enderecos =[
    {
      endereco: 'Rua Anapolis 11'
    },
    {
      endereco: "Rua Coronel Joao de Barros 427b"
    }
  ] 
  constructor() {}
  selectSexo(sexo){
    this.formCorrida.sexo = sexo;
  }

}
