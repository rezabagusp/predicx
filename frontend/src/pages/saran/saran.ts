import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { Http,Headers } from '@angular/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the Saran page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-saran',
  templateUrl: 'saran.html',
})
export class SaranPage {

  suggested :boolean = false;
  items : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider,
              public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Saran');
    this.predictSaran()
  }

  predictSaran(){
    let query ='predict/suggestion'
    let token = localStorage.getItem('token')
    let header= new Headers();
    header.append('Content-type', 'application/json' ); 
    header.append('Authorization',token)
    this.data.presentLoadingText();
    this.http.get(this.data.base_url+query,{headers:header})
    .subscribe(
      data =>{
        let response = data.json();
        if(response.status){
          console.log(response)
          if(response.hasOwnProperty("suggest")) {
            this.suggested = true
            this.items = response.suggest.slice(0,4)
          }
          else this.suggested = false
          this.data.loadings.dismiss();
        }
        else{
          console.log('gagal predict')
          this.data.loadings.dismiss();
          this.data.presentSyaratErrorAlert(response.message)
        }
      },
      err =>{
        this.data.loadings.dismiss();
        if(err.status == 401){
            this.data.presentAuthAlert(this.navCtrl.setRoot(LoginPage))
          }
          else if(err.status == 500){
            this.data.presentConnectionErrorAlert(null)
          }
      })
  }

}
