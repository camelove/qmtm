import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, Loading, ToastController, App } from 'ionic-angular';
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
import { FinalResultPage } from '../final-result/final-result';
import { Compiler } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { IonicStorageModule } from '@ionic/Storage';
// import { NativeStorage } from '@ionic-native/native-storage';

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
  
  data = {"remain_time":"","title":"", "qcount":"","yn_open_score_direct":"","id_movepage":""};
  number_array = new Array();
  items = { "q":"", "allotting":"" };
  save_data = { "answers":"","userid":"", "id_exam":"","remain_time":"","yn_open_score_direct":"","Test_name":"","alloting":"","qcount":""};
  exam:any; 
  viewexams:any;
  item_exam:any;
  loading: any;
  num_page=1;
  page :any;
  Answer = new Array();

  // define answer question;
  is_answer = new Array(); 
  
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
  arr_mutilchoice =new Array;
  arr_mutil_answerd = new Array;
  ans_mutilchoice:any;
  multil_index= new Array;
  count=0;
  check_mul = new Array;
  ex_count:any;
  limittime:any;
  timeOutEsc : any;
  only_next_move = false;
   /* define object of short-answer and essay type question */
   short_ans=new Array ;
   short_index=new Array;
   
   arr_short_ans = new Array;
   ans_short:any;
   essay:string = "String of essay"; 
   
  constructor(public navCtrl: NavController, 
              private app: App, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public auth:AuthServiceProvider,public http:Http) {

    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');
 
    var json;
    json = this.exam;
    this.save_data.Test_name = this.exam.Test_name;
    //init array mutilchoice

    for(var k = 0;k<5;k++){
      this.arr_mutilchoice[k]=0;
    }
    
    this.view_exam.id_exam =  json.Test_code;
    this.view_exam.userid = info.userID;
    this.auth.paper_etest(this.view_exam).then((result) => {
       
    var view_result;
    view_result = result;
    this.viewexams = view_result;
    this.limittime = view_result.limittime;
    this.data.id_movepage = view_result.id_movepage;
    if(this.data.id_movepage == 'N'){
      this.only_next_move = true;
    }
    // get object properties
    this.data.remain_time= view_result.remain_time;
    //check time to test
    if(this.data.remain_time>this.limittime){
      this.data.remain_time = this.limittime;
    }
    this.data.title = view_result.title;
    this.data.qcount = view_result.qcount;
    this.question_count = parseInt( this.data.qcount);
    this.save_data.yn_open_score_direct = view_result.yn_open_score_direct;
    this.save_data.alloting = view_result.allotting;
    this.save_data.qcount =view_result.qcount;
    this.item_exam = this.viewexams.Items;
    this.total_question = this.data.qcount;
    this.remain_question = this.total_question;
    this.has_answer = view_result.hasAnswer;
    this.str_answer = view_result.answers;
   // this.initTimer();


   //find index of short_answer in array all answer
   for( var i = 0; i < this.item_exam.length;i++){
        if(this.item_exam[i].id_qtype == 4){
          this.short_index[this.item_exam[i].page] = this.item_exam[i].page - 1;
         
        }

   }
//find index of multilchoice in array all answer
for( var i = 0; i < this.item_exam.length;i++){
  if(this.item_exam[i].id_qtype == 3){
    this.multil_index[this.item_exam[i].page] = this.item_exam[i].page - 1;
  }

}


    for(var i= 0; i<this.question_count;i++) {
      this.Answer[i]=null;
      this.number_array[i]=i+1;
    }
    // init array answer if hasanswer == true
    if((this.has_answer == true)&&(this.str_answer!="")) {
   
      this.Answer = this.str_answer.split("{:}",this.data.qcount);
      
        for(var j =0;j<this.question_count;j++) {
            if(this.Answer[j]!="") {
                this.is_answer[j]=true;
            }
          //this.multil_Str = this.Answer[j];
            
               // check all choiced in mutil question
            //    this.arr_mutil_answerd= this.Answer[this.multil_index[i]].split("{|}");
            //    //init again arr_mutilchoice if answered
            //    for(var k=0;k<5;k++){
            //      var index = this.arr_mutil_answerd[k];
            //      if(this.arr_mutil_answerd[k]!=null){
            //      this.arr_mutilchoice[index-1]= this.arr_mutil_answerd[k];
            //      }
            //  }
             
        }
    }


    

 // check mutil ans;
   // this.short_ans = this.Answer[0];
   
    }) 
  }

  ionViewDidEnter () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
    this.initTimer();
    this.startTimer();
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad EtestPage');

  //  ngOnInit() {
  //   //this.initTimer();
  //   this.startTimer();
  //   this.slides.lockSwipes(true);
  //   console.log('ionViewDidLoad EtestPage');

//checkmutil choice

     

  }
 
  // ionViewDidLeave() {
  //      this.displayTime = this.remainingTime;
  // }

  /* Initialize and setup the time for question */
  // ngOnInit() {
   
  // }
  
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
    this.timeOutEsc = setTimeout(() => {
  
      if (!this.runTimer) { return; }
      this.remainingTime--;
     
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      
      if (this.remainingTime >= 0) {
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
  check_time() {
    if(parseInt(this.remainingTime) == 120) {
      let alert = this.alertCtrl.create({
        title: 'Your time exist is two minutes,',
      
        buttons: ['OK']
      });
      alert.present();
    }
      if(parseInt(this.remainingTime) == 0){
        this.submit_ans();
        this.navCtrl.setRoot(FinalResultPage,{exam:this.save_data});  
      }
  }

  ionViewDidLoad() { 

    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');

    var fetchData;
    fetchData = this.exam;
    this.save_data.Test_name = this.exam.Test_name;    
    this.view_exam.id_exam =  fetchData.Test_code;
    this.view_exam.userid = info.userID;
    
    this.auth.paper_refresh(this.view_exam).then((result) => {
      var view_result;
      view_result = result;
      this.data.remain_time= view_result.remain_time;      
      this.data.title = view_result.title;      
      this.data.qcount = view_result.qcount;      
      this.save_data.yn_open_score_direct = view_result.yn_open_score_direct;      
      this.save_data.alloting = view_result.allotting;      
      this.save_data.qcount =view_result.qcount;
      this.item_exam = this.viewexams.Items;      
      this.total_question = this.data.qcount;      
      this.remain_question = this.total_question;      
      this.has_answer = view_result.hasAnswer;
      this.str_answer = view_result.answers;

    })  
  }
  /*
  * fetch data from question and answer to load refresh 
  */
  public refresh_onclick() {        
    //get the currently active page component
    var component = this.navCtrl.getActive().instance;
    //re-run the view load function if the page has one declared    
    if (component.ionViewDidLoad) {    
      this.loadDataRefresh();
      component.ionViewDidLoad();    
    }
    console.log("you are refreshed !!!");
  }

  public close_page() {
    this.navCtrl.pop();
  }

load_data_shortans() {
if(this.item_exam[this.num_page-1].id_qtype == 4)
{ 
  for( var i = 0 ; i<(this.item_exam[this.num_page-1].cacount);i++) {
    this.arr_short_ans[i] = null;
    this.short_ans[i]= null;
  }

  if (( this.short_index[this.num_page] == this.num_page -1)&&(this.Answer[this.num_page -1] != null)){
    this.short_ans = this.Answer[this.num_page -1 ].split("{|}");
    this.arr_short_ans = this.short_ans;
   }
}
}

load_data_mutilchoice(){
if(this.item_exam[this.num_page-1].id_qtype == 3)
{ 
  for ( var i = 0;i<5;i++){
    this.arr_mutilchoice[i]=null;
   }
if (( this.multil_index[this.num_page] == this.num_page -1)&&(this.Answer[this.num_page -1] != null))   {
   
   
   this.arr_mutil_answerd= this.Answer[this.num_page -1].split("{|}");
  
   //init again arr_mutilchoice if answered
   for(var k=0;k<5;k++){
     var index = this.arr_mutil_answerd[k];
     
     if(this.arr_mutil_answerd[k]!=null){
     this.arr_mutilchoice[index-1]= this.arr_mutil_answerd[k];
     }
 }
}
}
this.check_multi();
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


//Submit answer to Serve
save_ans() {   
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
    
      let alert = this.alertCtrl.create({
        title: 'You have not answer question ' + this.num_page,
        message: 'Are you sure to next question',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.num_page--;
            //  this.short_ans = this.Answer[this.num_page-1]; //view shortanswer  if is hasanswer=true
              this.presentToast("Trang so: "+this.num_page);
              console.log("trang so:" + this.num_page);
              console.log("data:" +this.Answer[this.num_page-1]);
              
              
              this.slides.lockSwipes(false);
              this.slides.slidePrev(500);
              this.slides.lockSwipes(true); 
                  
             
              this.page = this.num_page.toString();
            
              this.check_remainquestion();   
              this.save_ans();
              // this.navCtrl.setRoot('FinalResultPage');
              console.log('OK clicked');
              this.load_data_mutilchoice();
              this.load_data_shortans();
            }
          }
        ]
      });
      alert.present();
    }
    else {
        this.num_page--;
        //this.short_ans = this.Answer[this.num_page-1]; //view shortanswer  if is hasanswer=true
        this.presentToast("Trang so: "+this.num_page);
        console.log("trang so:" + this.num_page);
        console.log("data:" +this.Answer[this.num_page-1]);
        
        
        this.slides.lockSwipes(false);
        this.slides.slidePrev(500);
        this.slides.lockSwipes(true);         
      
        this.page = this.num_page.toString();
      
        this.check_remainquestion();   
        this.save_ans();
        this.load_data_mutilchoice();
        this.load_data_shortans();
        // this.navCtrl.setRoot('PrevPage');
      }

}

  /**
   * next_button
   * click button and call next_button() method on etest.html
   */
  public next_button() {
   

    if(this.is_answer[this.num_page-1] !=true) {
   
      let alert = this.alertCtrl.create({
        title: 'You have not answer question ' + this.num_page,
        message: 'Are you sure to next question',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.num_page++;
           //   this.short_ans = this.Answer[this.num_page-1];//view shortanswer if is hasanswer=true
              this.presentToast("Trang so: "+this.num_page);
             
              console.log("trang so:" + this.num_page);
              console.log("data:" +this.Answer[this.num_page-1]);
              
              /* TODO Something, add more condition check parameter here */          
                  
              this.slides.lockSwipes(false);
              this.slides.slideNext(500);
              this.slides.lockSwipes(true); 
               
              this.page = this.num_page.toString();
              this.check_remainquestion();
              this.save_ans(); 
              // this.navCtrl.setRoot('FinalResultPage');
              console.log('OK clicked');
              this.load_data_mutilchoice();
              this.load_data_shortans();
            }
          }
        ]
      });
      alert.present();
 
    }
    else{
    this.num_page++;
   // this.short_ans = this.Answer[this.num_page-1];//view shortanswer if is hasanswer=true
    this.presentToast("Trang so: "+this.num_page);
   
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
    this.load_data_mutilchoice();
    this.load_data_shortans(); 
    }
    // this.load_data_mutilchoice();
    // this.load_data_shortans();
  }

  ///Submit  all answer to serve and 
  submit_ans() {
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





  public submitAnswer(exam) {
    
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
			this.navCtrl.setRoot(FinalResultPage,{exam:this.save_data});  
            // this.navCtrl.setRoot('FinalResultPage');
            console.log('Submit clicked');
          }
        }
      ]
    });
    alert.present();
     this.submit_ans();
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
  
  /// on click multil choice
  public markedValueAnswerMultiChoice(etest:any,ans:any,check:any) {
    console.log("Ban vua chon cau tra loi multi choice !!");   
       
    console.log("You checkok, value is:" + etest);
  
    this.ex_count = parseInt(etest.excount);
    let index = parseInt(ans);
    this.check_mul[index-1] = !check;
  
    if(!check == true){
    this.arr_mutilchoice[ans-1] = ans;
    var virtualarr= new Array;
    for(var j=0;j<5;j++){
      virtualarr[j]= this.arr_mutilchoice[j];
    }

    // virtualarr = this.arr_mutilchoice;
    for (var i=4; i>=0; i--) {
      if ((virtualarr[i] === 0)||(virtualarr[i] === null)) {
        virtualarr.splice(i, 1);
          // break;       //<-- Uncomment  if only the first term has to be removed
      }
    }
    this.ans_mutilchoice = virtualarr.join("{|}");

    }

    else {
      this.arr_mutilchoice[ans-1] = 0;
      for (i = this.ex_count-1; i>=0; i--) {
        var virtualArr = new Array;
        for(var e=0;e<5;e++){
           virtualArr[e] = this.arr_mutilchoice[e];
           }
 
        // break;       //<-- Uncomment  if only the first term has to be removed
         for (var k=4; k>=0; k--) {
          if ((virtualArr[k] === 0)||(virtualArr[k] === null)) {
            virtualArr.splice(k, 1);
                  // break;       //<-- Uncomment  if only the first term has to be removed
          }
            
            this.ans_mutilchoice = virtualArr.join("{|}");
        }
    }
    }

    //this.question_answered ++;
    //console.log("You answerd : "+this.question_answered); 
    this.is_answer[this.num_page-1] =true;
    this.Answer[this.num_page-1] = this.ans_mutilchoice;
  }
  
  //check mutil question is answered;
  check_multi(){
    for(var i=0;i<5;i++){
      this.check_mul[i]= false;
    }
    for (var i =0;i<5;i++) {
      if (this.arr_mutilchoice[i]==i+1){
        this.check_mul[i] = true;
      }
     
    }
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

// question short_answer

markShortAns(index:any){
  console.log("your page: "+this.num_page);
  //this.question_answered ++;
  //console.log("You answerd : "+this.question_answered); 
   
  this.arr_short_ans[index] = this.short_ans[index];
  

  // var virtualarr= new Array;
  // for(var j=0;j<5;j++){
  //   virtualarr[j]= this.arr_short_ans[j];
  // }

  // // virtualarr = this.arr_mutilchoice;
  // for (var i=4; i>=0; i--) {
  //   if ((virtualarr[i] === null)||(virtualarr[i] === "")) {
  //     virtualarr.splice(i, 1);
  //       // break;       //<-- Uncomment  if only the first term has to be removed
  //   }
  // }
  this.ans_short = this.arr_short_ans.join("{|}");

 

  this.is_answer[this.num_page-1] =true;
  this.Answer[this.num_page-1] = this.ans_short;   
}



 //go to correct slide question
Goto_currentquestion(number_page:any) {

  this.slides.lockSwipes(false);
  this.slides.slideTo(number_page,100,true);
  this.slides.lockSwipes(true); 
  this.num_page = number_page + 1 ;
  this.load_data_mutilchoice();
  this.load_data_shortans();
  //this.next_button();

}

  /*
  * Show and check all condition: 
  * [1]check if not answered quetion and click 'next' button, 
  * [2]check remain time, 
  * [3]check answer is checked or not checked
  */ 

  check_button( ans:any ) {
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

  ngOnDestroy(){
    clearInterval(this.timeOutEsc );
  }


  loadDataRefresh() {
    this.loading = this.loadingCtrl.create({
        content: 'refreshing data...'
    });

    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
  }
}