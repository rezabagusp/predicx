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
  
  searchQuery: string = '';
  items: string[];
  choosed_item='';
  myInput=null;
  tempItems: string[];
  doughnutChartLabels:string[] = ['A', 'AB', 'B','BC','C','D'];
  doughnutChartData:number[] = [300, 350, 100, 50, 50, 50];
  doughnutChartType:string = 'pie';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictPage');
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }
  
  copyItems(){
    this.tempItems = this.items;
  }

  getItems(ev: any) {
      // Reset items back to all of the items
      // this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.tempItems = this.tempItems.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }  

    choosedItem(ev: any){
      console.log(ev)
      this.myInput = ev;
      this.tempItems = [];
    }
}
