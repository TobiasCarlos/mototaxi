import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  nome = "Sérgio Marinelli";
  constructor(private ajax: AjaxService) { 

    console.log("chegou aqui");
    /* new formdata */
    let formData = new FormData();
    formData.append('nome', 'Sérgio Marinelli');
    formData.append('telefone', '11998888888');
    this.ajax.getItem('/cliente').subscribe(data => {
      console.log(data);
    }),(error => {});
  }


}
