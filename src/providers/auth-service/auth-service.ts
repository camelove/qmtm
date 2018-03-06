import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// let loginURL = 'http://abc.com';
let loginURL = 'http://192.168.100.9:8080/QMTM_DEMO/mobile/user_check.jsp';
let exampleListURL = 'http://192.168.100.9:8080/QMTM_DEMO/mobile/exam/mytest.jsp';
let examDetailURL = 'http://localhost:8080/QMTM_DEMO/mobile/exam/etest.jsp';
let examPaperURL = 'http://localhost:8080/QMTM_DEMO/mobile/paper/etest.jsp';
let saveAnswerAndLogurl = 'http://localhost:8080/QMTM_DEMO/mobile/paper/saveans.jsp';
let scoreListURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/myscore.jsp';
let scoreDetailURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/scoreinfo.jsp';
let viewTestURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/qa.jsp';
let viewStaticURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/multistat.jsp';

export class User {
  userID: string;
  password: string;

  constructor(userID: string, password: string) {
    this.userID = userID;
    this.password = password;
  }
}

@Injectable()
export class AuthServiceProvider {

  currentUser: User;
  login_url:any;
  examlisturl:any;

  constructor(public http: Http) {
    console.log('AuthServiceProvider Provider');
  }

  /*
  * Method authenLogin() to credential and authen userid and password..
  * URL: http://192.168.100.2:8080/QMTM_DEMO/mobile/user_check.jsp
  */
  public authenLogin(credentials) {

    this.currentUser = credentials;
    this.login_url = loginURL+'?'+'userid='+credentials.userID +'&'+'password='+credentials.password;

    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
        //let options = new RequestOptions({ headers:headers});
        this.http.get(this.login_url).map(res => res.json()).subscribe(data => {
          console.log(data);     
          console.log(data.headers);
          resolve(data);      
        });
    });
  }


  /*
  * Method authenLogin() to credential and authen userid and password..
  * URL: http://localhost:8080/QMTM_DEMO/mobile/user_check.jsp
  */
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getUserInfo() : User{
    return this.currentUser;
    
  }

  /*
  * Method authenLogin() to credential and authen userid and password..
  * URL: http://localhost:8080/QMTM_DEMO/mobile/user_check.jsp
  */
  public exam_list(currentUser) {
    this.examlisturl = exampleListURL+'?'+'userid='+currentUser.userID;  
      return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');

      this.http.get(this.examlisturl).map(res => res.json()).subscribe(data => {
        console.log(data);
   
        console.log(data.headers);
        resolve(data);    
      });
    });
  }

}
