import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { Http,Headers } from '@angular/http';

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
  predictStatus = false;
  items: string[];
  choosed_item='';
  myInput=null;
  tempItems: string[];
  public chartLabels:string[] = ['A', 'AB', 'B','BC','C','D','E'];
  public chartData:number[]=[];
  public chartType:string = 'doughnut';
  public chartOptions:any = {
	  legend: {position: 'bottom'},
    responsive: true,
    maintainAspectRatio: false
  }
  loading:any;
  public chartColors: any[] = [
  { 
    backgroundColor:["#05234d", "#c57f28", "#7e5f40", "#6fff71", "#B9E8E0","#d64b4b","#632b58"] 
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public http: Http, public loadingCtrl: LoadingController) {
   // this.initializeItems();
  }
  
  presentLoadingText() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
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
      this.initializeItems();
      
      // set val to the value of the searchbar
      let val = ev.target.value;
      console.log(val)
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }  

  choosedItem(ev: any){
      console.log(ev)
      this.predictSC()
  }

  convert2Percent(item:any){
    var percent = 0;
    for(var i=0; i<this.chartLabels.length;i++){
      percent = item[this.chartLabels[i]]
      console.log(percent)
      this.chartData[i] = percent
    }
  }

  predictSC(){
    let query = 'predict/run-predict?d={"matkul":"mat219","smt":"3","value":"2,3,7"}&v=1'
    
    let header= new Headers();
    header.append('Content-type', 'application/json' ); 
    this.presentLoadingText();
    this.http.get(this.data.base_url+query,{headers:header})
    .subscribe(
      data =>{
        let response = data.json();
        if(response.status){
          console.log(response)
          this.convert2Percent(response.results.probability)
          this.predictStatus = true
          this.loading.dismiss();
        }
        else{
          console.log('gagal predict')
        }
      }
    )

  }
}
