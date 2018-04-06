import { LoginPage } from '../login/login';
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { Slides } from 'ionic-angular';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Http } from '@angular/http';

/**
 * Generated class for the FinalResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final-result',
  templateUrl: 'final-result.html',
})
export class FinalResultPage {

  public userID:any;

  view_exam = { "userid":"", "id_exam":"","yn_open_score_direct":"","allotting":"","qcount":"","Test_name":"" };
  
  data = {"remain_time":"","title":"", "qcount":"", "allotting":"","My_score":"My_score"};
  
  items = { "q":"", "allotting":"" };  
  
  exam:any; 
  viewexams:any;
  item_exam:any;
  
  question_count:any;
  total_question :any;
  count=0;
  
  constructor(public navCtrl: NavController, 
              public auth: AuthServiceProvider,
              public navParams: NavParams) {
        
    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');
 
    var json;
    json = this.exam;
   
    this.view_exam.id_exam =  json.id_exam;
    this.view_exam.userid = info.userID;
    this.view_exam.yn_open_score_direct = json.yn_open_score_direct;
    this.view_exam.allotting = json.alloting;
    this.view_exam.qcount = json.qcount;
    this.view_exam.Test_name = json.Test_name;
    this.auth.submitted_result(this.view_exam).then((result) => {       
      var view_result;
      view_result = result;
    

      this.viewexams = view_result;
       
      this.data.title = view_result.title;
      this.data.allotting = view_result.Allotting;
      this.data.qcount = view_result.Question_count;
      this.data.My_score = view_result.My_score;
      this.question_count = parseInt( this.data.qcount);
      
      this.item_exam = this.viewexams.Items;
      this.total_question = this.data.qcount;      
    }) 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalResultPage');
  }

  public finish_button() {
    this.navCtrl.setRoot('LoginPage');
    console.log("you have clicked finished button !!");
  }

}
