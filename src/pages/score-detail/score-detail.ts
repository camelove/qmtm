import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminTabsPage } from '../admin-tabs/admin-tabs';
import { MultistatPage } from '../multistat/multistat';

/**
 * Generated class for the ScoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-score-detail',
  templateUrl: 'score-detail.html',
})
export class ScoreDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoreDetailPage');
  }

  goViewAnswerExpl() {
    this.navCtrl.push(AdminTabsPage);
  }
  goViewStatic() {
    this.navCtrl.push(MultistatPage);
  }

}
