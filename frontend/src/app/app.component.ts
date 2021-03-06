import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PredictPage } from './../pages/predict/predict';
import { SaranPage } from '../pages/saran/saran';


@Component({
  templateUrl: 'app.html',
  providers:[]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  username:any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Beranda', component: HomePage },
      { title: 'Saran', component: SaranPage },
      { title: 'Prediksi', component: PredictPage },
      { title: 'Logout', component: null }
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component){
      this.nav.setRoot(page.component);
    }
    else if(page.component == null){
      localStorage.removeItem('token')
      this.nav.setRoot(LoginPage);
    }

  }
}
