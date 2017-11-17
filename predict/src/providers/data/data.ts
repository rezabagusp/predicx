import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  public base_url= "http://localhost:8000/"
  
  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  postData(token, url, creds){
    let header = new HttpHeaders;
    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API
    
    return new Promise(resolve => {
      this.http.post(url, creds, {headers : header})
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });

  }


}
