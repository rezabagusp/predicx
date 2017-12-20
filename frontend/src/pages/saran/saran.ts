import { Component } from '@angular/core';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Saran');
  }

}
