import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { Http,Headers,RequestOptions } from '@angular/http';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private username;
  private password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider,  public http: Http,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let creds = JSON.stringify({nama_user:this.username, password_user: this.password})

    let header= new Headers();
    header.append('Content-type', 'application/json' ); 

    this.http.post(this.data.base_url+'login/masuk', creds, {headers:header})
    .subscribe(
      data =>{
        let response = data.json();
        if(response.status){
          console.log('berhasil login')
          this.navCtrl.setRoot(HomePage)
        }
        else{
          console.log('gagal login')
        }
      }
    )

  }

}
