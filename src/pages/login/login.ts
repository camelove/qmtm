import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {LocalStorage, SessionStorage} from "angular-localstorage";
import { isCheckedProperty } from 'ionic-angular/util/util';

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
  //event:boolean;
  loading: any;
  resposeData:any;
  // rmchecked: any;
  eventclick: boolean =false;
  checked:boolean = true;
  user: any;
 pass: any;
  items:Array<{title: string, note: string}>;
  
  constructor(public navCtrl: NavController, 
              public authService: AuthServiceProvider, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              public formbuilder: FormBuilder,
              private toastCtrl: ToastController,
              public httpClient: HttpClient,

            ) {    
            this.loginData.password = localStorage.getItem("pass");

            this.loginData.userID = localStorage.getItem("userID");
         
            if (this.eventclick == false){
              localStorage.setItem ( "userID","");
              localStorage.setItem ( "pass","");
              
            }
              
              }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.eventclick);
    
  }

  public doLogin() {
    var re = new RegExp("\\s");
    this.user = this.loginData.userID;
    this.pass = this.loginData.password;
   // var data = this.loginData;
   

    if((this.user.search(re)!=-1)||(this.pass.search(re)!=-1)){
      this.presentToast("username or password had space character,Please give again");
     }
   else if(this.loginData.userID && this.loginData.password)
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
        /* 
        Connection failed message, please check your internet..
        Create more method to check connection internet
        */
        this.loading.dismiss();
        this.presentToast(err);
        this.presentToast("Please check your internet, 3g, 4g ...");
      });   
    }
    
    else {
      this.presentToast("Please give userID and password");
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
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /*
  * Check remember user when login    
  */
  checkRememberMe(e:any)  {
    console.log(e);
    console.log(e.checked);
    this.eventclick = e.checked;


   localStorage.setItem ( "userID",this.loginData.userID);
   localStorage.setItem ( "pass",this.loginData.password);




  }

}
