import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  numberTel = "";
  constructor() { }

  ngOnInit() {
  }
  formatNumber(e){

  }
}
