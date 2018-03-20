import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminTabsPage } from '../admin-tabs/admin-tabs';
import { MultistatPage } from '../multistat/multistat';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
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
  view_exam = { "userid":"", "id_exam":"" };
  exam:any;
  exam_detail: any;
  viewexams:any;
  jobs=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {


    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');
    var json;
    json = this.exam;
 
    this.view_exam.id_exam =  json.Test_code;
    this.view_exam.userid = info.userID;
    this.auth.score_detail(this.view_exam).then((result) => {
      this.viewexams =  Object.keys(result).map(function(key, index) {
        return result[key];
      })
      })
    
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoreDetailPage');
  }

  goViewAnswerExpl(exam) {
    this.navCtrl.push(AdminTabsPage,{exam:exam});
  }
  goViewStatic(exam) {
    this.navCtrl.push(MultistatPage,{exam:exam});
  }
  
  ischeck( viewexam:any){
    let _return = false;
    let c1 = viewexam.Score_view_option =='A';
    let c2 = viewexam.Score_view_option =='B';
    let c3 = viewexam.Score_view_option =='C';
    _return = (c1||c2||c3);
    return _return;

  }

  ischeck_score1( viewexam:any){
    let _return = false;
    
    let c1 = (viewexam.Score_view_option =='D');
    let c2 = (viewexam.Yn_end == 'Y');
    _return = (c1&&c2);
    return _return;

  }

  ischeck_score2( viewexam:any){
    let _return = false;
  
    let c1 = (viewexam.Score_view_option =='E');
    let c2 = (viewexam.Yn_end == 'Y');
    _return = (c1&&c2);
    return _return;

  }
}
