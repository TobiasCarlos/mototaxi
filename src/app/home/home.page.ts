import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {

  cashback = "0,00"
  page = 'carro'
 
 
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
  constructor(private platform: Platform, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    
  }
  selectSexo(sexo){
    this.formCorrida.sexo = sexo;
  }

  setPage(page){
    this.page = page;
  }

  



}
