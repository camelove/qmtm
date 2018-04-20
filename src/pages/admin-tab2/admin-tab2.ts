import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgIf } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';

/**
 * Generated class for the AdminTab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-tab2',
  templateUrl: 'admin-tab2.html',
})
export class AdminTab2Page {
  exam:any
  view_exam = { "userid":"", "id_exam":"" };
  viewexams:any;
  view_score:any;
  my_score = {"My_score":"","Test_name":"", "Test_allott":""};

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
    let info = this.auth.getUserInfo();
    this.exam = navParams.data;
    var json;
    json = this.exam;
    this.view_exam.id_exam =  json.Test_code;
    this.view_exam.userid = info.userID;
    
    // console.log('Passed params', navParams.data);
  this.auth.view_score(this.view_exam).then((result) => {
    
    this.view_score = result;
    this.viewexams = this.view_score.Items;
    this.my_score.My_score = this.view_score.My_score;
    this.my_score.Test_name = this.view_score.Test_name;
    this.my_score.Test_allott = this.view_score.Test_allott;
  })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTab2Page');
  }

  ionViewDidEnter () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
  }


}
