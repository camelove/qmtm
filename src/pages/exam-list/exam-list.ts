import { Component } from '@angular/core';
import { ExamDetailPage } from '../exam-detail/exam-detail';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';

/**
 * Generated class for the ExamListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam-list',
  templateUrl: 'exam-list.html',
})
export class ExamListPage {

  userID = '';
  password = '';
  loginData = { "userID":"", "password":"" };
  exams: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {

   let info = this.auth.getUserInfo();
   // this.userID = info['userID'];
   // this.password = info['password'];
   // this.loginData=info;
   this.auth.exam_list(info).then((result) => {
     var json;
    
     json =  result;
     this.exams = json.Items;
 
   })
 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad ExamListPage');
 }
 showExamDetailPage(exam) {

   this.navCtrl.setRoot(ExamDetailPage,{exam:exam});
 }

}
