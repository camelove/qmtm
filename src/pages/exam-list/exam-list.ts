import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExamDetailPage } from '../exam-detail/exam-detail';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamListPage');
  }
  showExamDetailPage() {

    this.navCtrl.setRoot(ExamDetailPage);
  }
 
}
