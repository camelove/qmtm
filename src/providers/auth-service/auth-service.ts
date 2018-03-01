import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
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
  
  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /*
  * Method authenLogin() to credential and authen userid and password..
  * URL: http://localhost:8080/QMTM_DEMO/mobile/user_check.jsp
  */
  authenLogin(credentials) {

    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      this.http.post(loginURL + 'login' , JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());  
        }, (err) => {
          reject(err);
        });
    });
  }

  
}
