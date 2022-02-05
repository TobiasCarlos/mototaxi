import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever';
declare let grecaptcha: any;
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  numberTel = '';
  recaptchaVerifier;
  confirmationResult;
  code;
  recaptchaWidgetId;
  smsSend = false;
  constructor(private fire: AngularFireAuth, private navCtrl: NavController) {}

  ngOnInit() {}
  ionViewDidEnter() {}
  formatNumber(e) {
    //formartar numero telefone
    const value = e.target.value;
    const numero = value.replace(/\D/g, '');
    const formated = numero.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (formated) {
      e.target.value = `(${formated[1]}) ${formated[2]}-${formated[3]}`;
    }
  }

  async sendNumero() {
    this.recaptchaVerifier.render().then((widgetId) => {
      this.recaptchaWidgetId = widgetId;
    });

    await this.fire
      .signInWithPhoneNumber('+55' + this.numberTel, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      })
      .catch((err) => {
        console.log(err);
        grecaptcha.reset(this.recaptchaWidgetId);
      });

    await SmsRetriever.startWatching().then(async (msg) => {
      console.log(msg);
    });
  }

  async verificaCaptcha() {
    this.smsSend = true;
    console.log('verificaCaptcha');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);

      }
    });

    this.recaptchaVerifier.render().then((widgetId) => {
      this.recaptchaWidgetId = widgetId;
    });

    this.sendNumero();
  }

  async login() {
    this.confirmationResult.confirm(this.code).then(async (result) => {
      console.log(result);
    });
  }

  perfilPage(){
    /* send to login page */
    this.navCtrl.navigateForward('/perfil');

    
  }
}
