import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
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

  loginData = { "userID":"", "password":"" };
  films: Observable<any>;
 
  loading: any;
  resposeData:any;
  /* 
  isLoggedIn: boolean = false;
  formgroup:FormGroup;
  userID:AbstractControl;
  password:AbstractControl;
  */
 items: Array<{title: string, note: string}>;
  constructor(public navCtrl: NavController, 
              public authService: AuthServiceProvider, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              public formbuilder: FormBuilder,
              private toastCtrl: ToastController,
              public httpClient: HttpClient) {
                   
              }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doLogin() {

   if(this.loginData.userID && this.loginData.password)
    {

      this.showLoader();
      this.authService.authenLogin(this.loginData).then((result) => 
      {

      console.log('response data from server');
      console.log(result);

      this.loading.dismiss();
      var json;
      json =result;
    
      json.forEach(element => 
        {
        if((element.Username !="") && (element.Status=="ok"))
        {
          this.navCtrl.setRoot(MenuPage);
        }
        else {
          this.presentToast("Please give valid userID and password");
        }
      });
 
      }, (err) => {
        // Connection failed message, please check your internet..
        this.loading.dismiss();
        this.presentToast(err);
      });   
    }
    
    else {
      this.presentToast("Give userID and password");
    }
  }

  showLoader() {
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
  /*
  check condition of some cases: 
    1. input userID, 
    2. input password, 
    3. input userID wrong, 
    4. input password wrong
  display by toast message
  */

}
