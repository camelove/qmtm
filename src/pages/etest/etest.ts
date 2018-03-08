import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


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

  view_exam = { "userid":"", "id_exam":"" };
  exam:any;
 
  viewexams:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthServiceProvider) {

    let info = this.auth.getUserInfo();
    this.exam = this.navParams.get('exam');
 
    var json;
    json = this.exam;
   
    this.view_exam.id_exam =  json.Test_code;
    this.view_exam.userid = info.userID;
    this.auth.paper_etest(this.view_exam).then((result) => {
      this.viewexams =  Object.keys(result).map(function(key, index) {
        return result[key];
      })
    }) 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtestPage');
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
    this.navCtrl.setRoot('PrevPage');
  }

  /**
   * next_button
   * click button and call next_button() method on etest.html
   */
  public next_button() {
    this.navCtrl.setRoot('NextPage');
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

}

