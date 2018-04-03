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
import { Http } from '@angular/http';


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
  
  data = {"remain_time":"","title":"", "qcount":"","yn_open_score_direct":""};
  number_array = new Array();
  items = { "q":"", "allotting":"" };
  save_data = { "answers":"","userid":"", "id_exam":"","remain_time":"","yn_open_score_direct":""};
  exam:any; 
  viewexams:any;
  item_exam:any;
  loading: any;
  num_page=1;
  page :any;
  Answer = new Array();
  is_answer = new Array(); // define answer question;
  /* define parameter for timer */
  timeInSeconds: number; 
  time: number;
  remainingTime: any;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  remain_question: any;
  question_count:any;
  total_question :any;
  str_answer:any;
 has_answer:any;
 checkedRadio = true;

   /* define object of short-answer and essay type question */
   short_ans:string = "string of short-answer";
   essay:string = "String of essay"; 
   
  constructor(public navCtrl: NavController, 
              private app: App, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public auth:AuthServiceProvider,public http:Http) {

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
    this.question_count = parseInt( this.data.qcount);
    this.save_data.yn_open_score_direct = view_result.yn_open_score_direct;
    this.item_exam = this.viewexams.Items;
    this.total_question = this.data.qcount;
    this.remain_question = this.total_question;
    this.has_answer = view_result.hasAnswer;
    this.str_answer = view_result.answers;
    for(var i= 0; i<this.question_count;i++) {
      this.Answer[i]=null;
      this.number_array[i]=i+1;
    }
    // init array answer if hasanswer == true
    if(this.has_answer == true) {

      this.Answer = this.str_answer.split("{:}",this.data.qcount);
        for(var j =0;j<this.question_count;j++) {
            if(this.Answer[j]!="") {
                this.is_answer[j]=true;
            }
        }
    }
    }) 
  }

  public ionViewDidEnter(credentials) {
    this.initTimer();
    this.startTimer();
    
    console.log('ionViewDidLoad EtestPage');
  }

  /* Initialize and setup the time for question */
  ngOnInit() {
   
  }
  
  initTimer() {
     // Initialization is usually for 25 minutes
    if (!this.timeInSeconds) { 
      this.timeInSeconds = parseFloat( this.data.remain_time); 
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
  
  /* 
  pauseTimer() {
    this.runTimer = false;
  }
  
  resumeTimer() {
    this.startTimer();
  } 
  */
  
  timerTick() {
    setTimeout(() => {
  
      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
        this.check_time();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
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
check_time(){
  if(parseInt(this.remainingTime) == 3300){
    let alert = this.alertCtrl.create({
      title: 'Your time exist is five minutes,',
     
      buttons: ['OK']
    });
    alert.present();
  }
    

}




  public refresh_onclick() {
    this.navCtrl.setRoot('RefreshPage');
  }
  public check_remainquestion() {
  var question_answered = 0;
  for(var i = 0 ; i< this.question_count;i++) {
    if(this.is_answer[i]==true){
     question_answered++;

    }
  }

  this.remain_question = this.total_question - question_answered;
  }

  /**
   * view_question method
   * click button and call view_question() method on etest.html
   */
  public view_question() {
    this.navCtrl.setRoot('ViewQuestion');
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'You have not answer question'+this.num_page,
     
      buttons: ['OK']
    });
    alert.present();
    
  }
//Submit answer to Serve

save_ans( ){
   
this.save_data.answers = this.Answer.join("{:}");
this.save_data.id_exam = this.view_exam.id_exam;
this.save_data.userid = this.view_exam.userid;
this.save_data.remain_time = this.remainingTime; 
this.auth.save_ans(this.save_data);
}
  /**
   * prev_button() method
   * click button and call prev_button() method on etest.html
   */
  public prev_button() {
    if(this.is_answer[this.num_page-1] !=true) {
      this.presentAlert(); 
    }

    this.num_page--;
    this.presentToast("Trang so: "+this.num_page);
    console.log("trang so:" + this.num_page);
    console.log("data:" +this.Answer[this.num_page-1]);
    
    
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500);
    this.slides.lockSwipes(true); 
        
   
    this.page = this.num_page.toString();
  
    this.check_remainquestion();   
    this.save_ans();
    // this.navCtrl.setRoot('PrevPage');
  }

  /**
   * next_button
   * click button and call next_button() method on etest.html
   */
  public next_button() {
    if(this.is_answer[this.num_page-1] !=true) {
      this.presentAlert();
 
    }
    this.num_page++;
    this.presentToast("Trang so: "+this.num_page);
    this.presentToast("You don't answer for this question.."); 
    console.log("trang so:" + this.num_page);
    console.log("data:" +this.Answer[this.num_page-1]);
   
    /* TODO Something, add more condition check parameter here */          
        
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);
    this.slides.lockSwipes(true); 
     
    this.page = this.num_page.toString();
    this.check_remainquestion();
    this.save_ans();
    // this.loading.dismiss();    
  }

  ///Submit  all answer to serve and 
  submit_ans(){
  this.save_data.answers = this.Answer.join("{:}");
  this.save_data.id_exam = this.view_exam.id_exam;
  this.save_data.userid = this.view_exam.userid;
  this.save_data.remain_time = this.remainingTime; 

    this.auth.Submit_ans(this.save_data);

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
            this.navCtrl.setRoot('FinalResultPage');
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

  public markedValueAnswerMultiChoice(ex:any,ans:any) {
    console.log("Ban vua chon cau tra loi multi choice !!");   
       
    console.log("You checkok, value is:" + ex);
    //this.question_answered ++;
    //console.log("You answerd : "+this.question_answered); 
    this.is_answer[this.num_page-1] =true;
    this.Answer[this.num_page-1] = ans;
  }

  public markedValueAnswerChoice(ex:any,ans:any) {
    console.log("Ban vua chon cau tra loi multi choice !!");   
       
    console.log("You checkok, value is:" + ex);
    //this.question_answered ++;
    //console.log("You answerd : "+this.question_answered); 
    this.is_answer[this.num_page-1] =true;
    this.Answer[this.num_page-1] = ans;
  }



  public markedValueAnswerOX(ex:any,ans:any) {
    // console.log(ex1);
    // let _result ;
    console.log("your page: "+this.num_page);
    console.log("You selected OX, value is:  " + ex);
    //this.question_answered ++;
    //console.log("You answerd : "+this.question_answered); 
    this.is_answer[this.num_page-1] =true;
    this.Answer[this.num_page-1] = ans;   
  }

  /*
  * Show and check all condition: 
  * [1]check if not answered quetion and click 'next' button, 
  * [2]check remain time, 
  * [3]check  
  */
// check answer is checked or not checked

check_button( ans:any){

  let _return = false;
  if(this.Answer[this.num_page-1] == ans ){
    _return = true;
  }
return _return;


}




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

