import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScoreDetailPage} from "../score-detail/score-detail";
/**
 * Generated class for the ScoreListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-score-list',
  templateUrl: 'score-list.html',
})
export class ScoreListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoreListPage');
  }
  Gotoscoredetail(){
    this.navCtrl.setRoot( ScoreDetailPage) ;
  
    }
}
