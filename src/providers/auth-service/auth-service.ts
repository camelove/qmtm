import { HttpClient } from '@angular/common/http';
// import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let loginURL = 'http://localhost:8080/QMTM_DEMO/mobile/user_check.jsp';
let myTestURL = 'http://URL/mobile/exam/mytest.jsp';
let examDetailURL = 'http://URL/mobile/exam/etest.jsp';
let examPaperURL = 'http://URL/mobile/paper/etest.jsp';
let saveAnswerAndLogurl = 'http://URL/mobile/paper/saveans.jsp';
let scoreListURL = 'http://URL/mobile/score/myscore.jsp';
let scoreDetailURL = 'http://URL/mobile/score/scoreinfo.jsp';
let viewTestURL = 'http://URL/mobile/score/qa.jsp';
let viewStaticURL = 'http://URL/mobile/score/multistat.jsp';


@Injectable()
export class AuthServiceProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /*
  * Method authenLogin() to credential and authen userid and password..
  * URL: http://localhost:8080/QMTM_DEMO/mobile/user_check.jsp
  */
  authenLogin(credentials/* , type */) {

    return new Promise((resolve, reject) => {      
      this.http.post(loginURL /* + type */, JSON.stringify(credentials))
        .subscribe(res => {
          resolve(res);   //.json()
        }, (err) => {
          reject(err);
        });
    });
  }

  
}
