import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  // public base_url= "http://b64b32e6.ngrok.io/"
  public base_url= "http://localhost:3000/"  
  public loadings:any;
  public alert:any;

  public claims:any;
  public token:any;
  public semester:any;
  public username:any;

  //define jwt helper
  jwthelper:JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public LoadingCtrl: LoadingController, public alertCtrl:AlertController) {
    console.log('Hello DataProvider Provider');
  }

  getLocalStorage(){
    this.token = localStorage.getItem('token');
    this.claims = this.jwthelper.decodeToken(this.token);
    this.semester = this.claims.smt;
    this.username = this.claims.nama_user;
  }

  presentLoadingText() {
    this.loadings = this.LoadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...'
    });
    this.loadings.present();
  }

  presentAlert(title,subTitle,buttontext,funcHandler,backdrop:boolean){
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [
      {
        text: buttontext,
        handler: () => {
          funcHandler
        }
      }],
      enableBackdropDismiss : backdrop
    });
    this.alert.present();
  }

  presentAuthAlert(funcHandler) {
    this.alert = this.alertCtrl.create({
      title: 'Authentication Failed',
      subTitle: 'Token anda sudah kadarluasa, silahkan login ulang',
      buttons: [
      {
        text: 'Ok',
        handler: () => {
          funcHandler
        }
      }],
      enableBackdropDismiss : false
    });
    this.alert.present();
  }

  presentSyaratErrorAlert(message) {
    this.alert = this.alertCtrl.create({
      title: 'Prediksi Error',
      subTitle: message,
      buttons: ['Dismiss']
    });
    this.alert.present();
  }

  presentConnectionErrorAlert(funcHandler) {
    this.alert = this.alertCtrl.create({
      title: 'Connection Error',
      subTitle: 'Silahkan cek konneksi internet anda',
      buttons: [
      {
        text: 'Try Again',
        handler: () => {
          funcHandler
        }
      }]
    });
    this.alert.present();
  }

  postData(token, url, creds){
    let header = new HttpHeaders;
    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API
    
    return new Promise(resolve => {
      this.http.post(url, creds, {headers : header})
        .subscribe(data => {
          resolve(data);
          console.log(data)
        }, err => {
          console.log(err);
        });
      });
  }

  isHaveToken(){
    var token = localStorage.getItem('token')

    if(token)
      return true
    else
      return false
  }

}
