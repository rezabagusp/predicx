import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { Http,Headers } from '@angular/http';
import { LoginPage } from '../login/login';

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
  
  allData:any;
  searchQuery: string = '';
  predictStatus = false;
  items: string[];
  choosed_item:string;
  myInput=null;
  tempItems: string[]=[];
  searchStatus = false;
  studyHour:number;
  hours:any;
  id:number;
  hasilPrediksi:number;
  public chartLabels:string[] = ['A', 'AB', 'B','BC','C','D','E'];
  public chartData:number[]=[];
  public chartType:string = 'doughnut';
  public chartOptions:any = {
	  legend: {position: 'bottom'},
    responsive: true,
    maintainAspectRatio: false
  }
  public chartColors: any[] = [
  { 
    backgroundColor:["green", "#c57f28", "yellow", "#05234d", "#B9E8E0","#d64b4b","#632b58"] 
  }];
  public selectOptions = {
    title: 'Durasi Jam Belajar ',
    subTitle: 'Pilih durasi jam per minggu',
    mode: 'md'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, 
              public http: Http) {
    this.hours = Array.from(new Array(24),(val,index)=>index+1);
    console.log(this.hours)
  }

  ionViewDidLoad() {
    this.initializeItems();
    console.log('ionViewDidLoad PredictPage');
  }

  toList(src,dst){
    var kodeDanNama = ''
    for(var i=0;i<src.length;i++){
      kodeDanNama = src[i]['kode_mata_kuliah'].toUpperCase() + ' - ' + src[i]['nama_mata_kuliah']
      dst.push(kodeDanNama)
    }
  }

  initializeItems() {
    let query = 'matkul/all'
    let header= new Headers();
    let token = localStorage.getItem('token')
    header.append('Content-type', 'application/json' );  
    header.append('Authorization',token)
    this.http.get(this.data.base_url+query,{headers:header})
    .subscribe(
      data =>{
        let response = data.json();
        if(response.status){
          console.log(response)
          this.allData = response.data;
          this.toList(this.allData,this.tempItems)
        }
        else{
          console.log('gagal mengambil semua matakuliah')
        }
      },
      err =>{
        if(err.status == 401){
            this.data.presentAuthAlert(this.navCtrl.setRoot(LoginPage))
          }
          else{
            this.data.presentConnectionErrorAlert(this.predictSC())
          }
      }
    )
  }
  
  copyItems(){
    this.items = this.tempItems;
  }

  getItems(ev: any) {
      // Reset items back to all of the items
      this.copyItems();
      // Show suggestion items
      this.searchStatus = true;
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

  choosedItem(item,ev: number){
      console.log(item)
      this.searchStatus = false;
      this.choosed_item = item;
      this.id = ev;
  }

  convert2Percent(item:any){
    var percent = 0;
    for(var i=0; i<this.chartLabels.length;i++){
      percent = item[this.chartLabels[i]]
      this.chartData[i] = percent
    }
    console.log(this.chartData)
    let self = this
    this.hasilPrediksi = this.chartData.findIndex(function(num){return num==Math.max.apply(null,self.chartData)})
  }

  checkPredictForm(){
    if(this.id != null || this.studyHour!=null){
      this.predictSC()
    }
    else{
      let title = "Field Masih Kosong"
      let subTitle = "Silahkan isi matakuliah dan jam belajar"
      let buttonText = "Dismiss"
      let funcHandler = null
      this.data.presentAlert(title,subTitle,buttonText,funcHandler,true)
    }
  }

  predictSC(){
    this.predictStatus = false
    let mkid = this.allData[this.id]['id']
    let query = 'predict/predict?mkid=' + mkid + '&studyhour=' + this.studyHour
    let token = localStorage.getItem('token')
    console.log(token)
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
          this.convert2Percent(response.results.probability)
          this.predictStatus = true
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
          else{
            this.data.presentConnectionErrorAlert(this.predictSC())
          }
      }
    )

  }
}
