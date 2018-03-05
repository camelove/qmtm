import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  
  loading: any;
  resposeData:any;
  /* 
  isLoggedIn: boolean = false;
  formgroup:FormGroup;
  userID:AbstractControl;
  password:AbstractControl;
  */
    
  constructor(public navCtrl: NavController, 
              public authService: AuthServiceProvider, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              public formbuilder: FormBuilder,
              private toastCtrl: ToastController) {

                 
                /*
                Check condition validate for textbox if neccessary 
                this.formgroup = formbuilder.group({
                  userID:['',Validators.required, Validators.minLength(5)],
                  password:['',Validators.required, Validators.maxLength(15)]
                });

                this.userID = this.formgroup.controls['userID'];
                this.password = this.formgroup.controls['password'];  
                */                
              }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doLogin() {

   if(this.loginData.userID && this.loginData.password) {

      this.showLoader();
      this.authService.authenLogin(this.loginData).then((result) => {

      console.log('response data from server');
      console.log(result);

      this.loading.dismiss();
      this.resposeData = result;
      console.log(this.resposeData);

      if(this.resposeData.loginData) {
        localStorage.setItem('loginData', JSON.stringify(this.resposeData))   // 'token', 'this.resposeData.access_token'
        this.navCtrl.setRoot(MenuPage);
      }
      else {
        this.presentToast("Please give valid userID and password");
      }

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
