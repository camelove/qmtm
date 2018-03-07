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

  get_all_etest = { "userid":"", "id_exam":"" };      // view_exam
  exam_test:any;
  do_exam:any;    // exam_detail
  do_test:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.exam_test = this.navParams.get('exam');
    var json;
    json = this.exam_test;
 
    this.get_all_etest.id_exam =  json.Test_code;
    this.get_all_etest.userid = info.userID;
    this.auth.paper_etest(this.get_all_etest).then((result) => {
      this.do_test =  Object.keys(result).map(function(key, index) {
        return result[key]
      });
    });
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

