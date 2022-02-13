import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nome = '';
  numberTel = '';
  constructor(public route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.numberTel = params['numberTel'];
    });
  }

  ngOnInit() {
  }


  submitInformations() {
    console.log(this.nome);
    console.log(this.numberTel);

    this.http.post('http://localhost:3000/clientes', {
      nome: this.nome,
      telefone: this.numberTel,
      aplicativoId: 'df9bb42f-936e-499c-9b64-ccb11d37ddc2'
    }).subscribe(
      data => {
        localStorage.setItem('telefone', this.numberTel);
        localStorage.setItem('idCliente', data['id']);
      }
    );
  }

}
