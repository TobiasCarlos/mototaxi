import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever';
declare let grecaptcha: any;
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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
  constructor(private fire: AngularFireAuth, private navCtrl: NavController, private http: HttpClient) {
    const telefone = localStorage.getItem('telefone');
    const idCliente = localStorage.getItem('idCliente');
    if(telefone && idCliente){
      this.http.post('http://localhost:3000/clientes/verify', {
        telefone: telefone,
        idCliente: idCliente,
        aplicativoId: 'df9bb42f-936e-499c-9b64-ccb11d37ddc2'
      }).subscribe(data => {
        this.navCtrl.navigateForward('/mapa-carro');
      }, error => {
        console.log(error);
        //apago os dados do local storage
        localStorage.removeItem('telefone');
        localStorage.removeItem('idCliente');
      });
     
    }
  }

  ngOnInit() {
  }
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

    this.recaptchaVerifier.verify()

    this.recaptchaVerifier.render().then((widgetId) => {
      this.recaptchaWidgetId = widgetId;
    });
  }

  async login() {
    this.confirmationResult.confirm(this.code).then(async (result) => {
      console.log(result);
    });
  }

  perfilPage(){
    this.navCtrl.navigateForward('/perfil', {
      queryParams: {
        numberTel: this.numberTel
      }
    }); 
  }
}
