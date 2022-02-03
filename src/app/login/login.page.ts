import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  numberTel = '';
  recaptchaVerifier;
  constructor(private fire: AngularFireAuth) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign', {
      size: 'invisible',
    });
  }
  formatNumber(e) {
    //formartar numero telefone
    const value = e.target.value;
    const numero = value.replace(/\D/g, '');
    const formated = numero.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (formated) {
      e.target.value = `(${formated[1]}) ${formated[2]}-${formated[3]}`;
    }
  }

  async verificaNumber() {
    await this.fire
      .signInWithPhoneNumber('+55' + this.numberTel, this.recaptchaVerifier)
      .then((token) => {
        console.log('tokennnnnnn', token);
      })
      .catch((err) => {
        console.log(err);
      });

    SmsRetriever.startWatching().then(async (msg) => {
      console.log(msg);
    });
  }
}
