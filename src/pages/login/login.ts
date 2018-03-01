import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  // loginData = { userID:'', password:'' };
  formgroup:FormGroup;
  userID:AbstractControl;
  password:AbstractControl;

  loginData = { "userID":"", "password":"" };
  loading: any;
  data:any;
  isLoggedIn: boolean = false;
    
  constructor(public navCtrl: NavController, 
              public authService: AuthServiceProvider, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              public formbuilder: FormBuilder,
              private toastCtrl: ToastController) {

                /* 
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
    
    this.showLoader();
    this.authService.authenLogin(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(MenuPage);

    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });    
    

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
