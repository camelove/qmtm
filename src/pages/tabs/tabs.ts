import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'tabs'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('tabs')
  public tabRef: Tabs;
  public tab1Root: any = 'Tab1Page';
  // public tab2Root: any = 'Tab2Page';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidEnter() {
  //   this.tabRef.select(this.navParams.data.tabIndex || 0);
  // }

}
