import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the PredictPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-predict',
  templateUrl: 'predict.html',
})
export class PredictPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictPage');
  }

}
