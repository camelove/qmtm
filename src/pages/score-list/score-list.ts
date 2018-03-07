import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScoreDetailPage} from "../score-detail/score-detail";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
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
  userID = '';
  password = '';
  loginData = { "userID":"", "password":"" };
  exams:  any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.auth.score_list(info).then((result) => {
      var json;
      json =  result;
      this.exams = json.Items;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoreListPage');
  }
  Gotoscoredetail(exam){
    this.navCtrl.setRoot( ScoreDetailPage,{exam:exam}) ;
  
    }
}
