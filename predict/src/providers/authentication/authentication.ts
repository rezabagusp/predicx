import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';


/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: Http) {
    console.log('Hello AuthenticationProvider Provider');
  }

}
