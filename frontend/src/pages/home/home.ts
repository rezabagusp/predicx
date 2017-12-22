import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { Http,Headers } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private semester;
  private jumlah_mata_kuliah;
  private list_matkul=[];


  constructor(public navCtrl: NavController, public data: DataProvider, public http: Http) {

  }

  // initiate user data saat pertama kali masuk ke root page home
  ionViewDidLoad(){
      this.data.getLocalStorage()    
  }
  ionViewDidEnter(){
    this.semester = this.data.semester
    this.getAllHistoryMataKuliah();
  }

  getAllHistoryMataKuliah(){
    let header= new Headers();
    header.append('Content-type', 'application/json' ); 
    header.append('Authorization', this.data.token ); 

    this.http.get(this.data.base_url+'matkul/history-matkuls?username='+this.data.username, {headers: header})
    .subscribe(
      response => {
        let data = response.json()
        if(data.status){
          this.list_matkul = data.result;
          console.log(data)
          this.jumlah_mata_kuliah = this.list_matkul.length
        }
        else 
          console.log(data.message)
      }
    )
  }
}
