import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CKEditorModule } from 'ng2-ckeditor';

/**
 * Generated class for the AdminTab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 /*
  khanh try to push content of file
 */

@IonicPage()
@Component({
  selector: 'page-admin-tab1',
  templateUrl: 'admin-tab1.html',
})
export class AdminTab1Page {
exam:any
view_exam = { "userid":"", "id_exam":"" };
viewexams:any;
view_score:any;
data = {"My_score":"","Test_name":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
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
    this.data.My_score = this.view_score.My_score;
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTab1Page');
  }

  ionViewDidEnter () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
  }

}
