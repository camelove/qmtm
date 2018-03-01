import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // username:string = '';
  // password:string = '';
  // loginData = { userID:'', password:'' };
  loginData = { "userID":"", "password":"" };
  loading: any;
  data:any;
  isLoggedIn: boolean = false;
    
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public navParams: NavParams, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doLogin() {
    this.showLoader();
    this.authService.authenLogin(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(MenuPage);

    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });  // case condition if userID or password wrong !!    
    

    /* let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 1000
    });
    loader.present(); */
    // this.navCtrl.setRoot(MenuPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
