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
import {TimerObservable} from "rxjs/observable/TimerObservable";

/**
 * Generated class for the EtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etest',
  templateUrl: 'etest.html',
})
export class EtestPage {

  @ViewChild(Slides) slides: Slides;

  public userID:any;

  view_exam = { "userid":"", "id_exam":"" };
  
  data = {"remain_time":"","title":"", "qcount":""};
  number_array = new Array();
  items = { "q":"", "allotting":"" };
  public check_ox :any;
  exam:any; 
  viewexams:any;
  item_exam:any;
  loading: any;
  num_page=0;
  page :any;
  Answer = new Array();

  /* define parameter for timer */
 timeInSeconds: number; 
 time: number;
 remainingTime: number;
 runTimer: boolean;
 hasStarted: boolean;
 hasFinished: boolean;
 displayTime: string;

  constructor(public navCtrl: NavController, 
              private app: App, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private auth:AuthServiceProvider) {

    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');
 
    var json;
    json = this.exam;
   
    this.view_exam.id_exam =  json.Test_code;
    this.view_exam.userid = info.userID;
    this.auth.paper_etest(this.view_exam).then((result) => {
       
    var view_result;
    view_result = result;
    this.viewexams = view_result;

    // get object properties
    this.data.remain_time= view_result.remain_time;
    this.data.title = view_result.title;
    this.data.qcount = view_result.qcount;

    
    this.item_exam = this.viewexams.Items;
    
    for(var i= 0; i<this.item_exam.length;i++){
      this.number_array[i]=i+1;
    }
 
    }) 

  }

  public ionViewDidLoad(credentials) {
    console.log('ionViewDidLoad EtestPage');
  }


  /* Initialize and setup the time for question */
  ngOnInit() {
    this.initTimer();
  }
  
  initTimer() {
     // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) { 
      this.timeInSeconds = 1500; 
    }
  
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }
  
  startTimer() {
     this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }
  
  pauseTimer() {
    this.runTimer = false;
  }
  
  resumeTimer() {
    this.startTimer();
  }
  
  timerTick() {
    setTimeout(() => {
  
      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }


  /**
   * refresh_onclick() method
   * click button and call refresh_onclick() method on etest.html
   */
  public refresh_onclick() {
    this.navCtrl.setRoot('RefreshPage');
  }

  /**
   * view_question method
   * click button and call view_question() method on etest.html
   */
  public view_question() {
    this.navCtrl.setRoot('ViewQuestion');
  }

  /**
   * prev_button() method
   * click button and call prev_button() method on etest.html
   */
  public prev_button() {
    this.num_page--;
    this.presentToast("Trang so: "+this.num_page);
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500);
    this.slides.lockSwipes(true);    
    this.page = this.num_page.toString();
    // this.navCtrl.setRoot('PrevPage');
  }

  /**
   * next_button
   * click button and call next_button() method on etest.html
   */
  public next_button() {

    /* * TODO Something, add more condition check parameter here */           
    this.num_page++;
    this.presentToast("Trang so: "+this.num_page);
    this.presentToast("You don't answer for this question..");    
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);
    this.slides.lockSwipes(true);
    this.page = this.num_page.toString();
    // this.loading.dismiss();    
  }

  /*
  * submitAnswer()method
  * click button and send all answers to server
  */
  public submitAnswer() {    
    
    this.presentToast("You have clicked submit answer !!");
    console.log("You have clicked submit answer ! ");

    let alert = this.alertCtrl.create({
      title: 'Confirm Submit Test',
      message: 'Are you sure submit your test?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: () => {
            console.log('Submit clicked');
          }
        }
      ]
    });
    alert.present();
  } 
  
  /**
   * review_answer() method
   * click button and call review_andswer() method on etest.html
   */
  public review_answer() {
    this.navCtrl.setRoot('ReviewPage');
  }

  public AnsCheck() {
    
  }

  public markedValueAnswerMultiChoice(ex:any,etest:any) {
    console.log("Ban vua chon cau tra loi multi choice !!");
    var numpage = etest.page;
    if(ex ==etest.ex1) {
       this.check_ox = 10; 
       console.log("You checkok, value is:" + this.check_ox);
      
       this.Answer[numpage] = etest.ex1;
    }
    else if(ex == etest.ex2) {
       this.check_ox = 11;
       console.log("You checkok, value is:" + this.check_ox);
       this.Answer[numpage] = etest.ex2;
    }
    else if(ex ==etest.ex3) {
      this.check_ox = 12;
      console.log("You checkok, value is:" + this.check_ox);
      this.Answer[numpage] = etest.ex3;
    }
    else {
      this.check_ox = 13;
      console.log("You checkok, value is:" + this.check_ox);
      this.Answer[numpage] = etest.ex4;
    }
  }

  public markedValueAnswerOX(etest:any,numpage:any) {      // event    
    // console.log(ex1);
    // let _result ;
    console.log("your page: "+this.num_page);
    console.log("You selected OX, value is:  " + etest);
    if( etest == 'O') {
       this.check_ox = 0;
       console.log("You checkok, value is:" + this.check_ox);
       this.Answer[numpage] = 'O';
    }
   else {
      this.check_ox = 1;
      console.log("You checkok, value is:" + this.check_ox);
      this.Answer[numpage] = 'X';
    }
   
  }

  /*
  * Show and check all condition: 
  * [1]check if not answered quetion and click 'next' button, 
  * [2]check remain time, 
  * [3]check  
  */
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Processing data...'
  });

  this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}

