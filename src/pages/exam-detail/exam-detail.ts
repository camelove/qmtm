import { Component } from '@angular/core';
import { EtestPage } from '../etest/etest';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the ExamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam-detail',
  templateUrl: 'exam-detail.html',
})
export class ExamDetailPage {

  view_exam = { "userid":"", "id_exam":"" };
  exam:any;
  exam_detail:any;
  viewexams:any;  
  status_source:any;
  check_status:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');
    var json;
    json = this.exam;
 
    this.view_exam.id_exam =  json.Test_code;
    this.view_exam.userid = info.userID;
    this.auth.exam_detail(this.view_exam).then((result) => {
      var view_result;
       view_result = result;
     this.status_source = view_result[0].Test_submit;
     if(this.status_source == 'Start to test'){
      this.check_status =false;
    }
    else{
     this.check_status =true;
    }

      this.viewexams =  Object.keys(result).map(function(key, index) {
        return result[key]
      });   
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamDetailPage');
  }

  goEtestPage(exam) {
    this.navCtrl.push(EtestPage,{exam:exam});
  }

}
