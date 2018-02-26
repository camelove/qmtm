import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {MenuPage} from '../menu/menu';
// import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // constructor(public loadingCtrl: LoadingController) {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doLogin(){
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   duration: 1000
    // });
    // loader.present();
    this.navCtrl.setRoot(MenuPage);
  }

  // presentLoading() {
  //   this.loadingCtrl.create({
  //       content: 'please wait...',
  //       duration: 3000,
  //       dismissOnPageChange: true  
  //   }).present;
  // }

}
