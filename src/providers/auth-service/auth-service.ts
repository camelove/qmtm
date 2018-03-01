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
// let loginURL = 'https://swapi.co/api/films';

let myTestURL = 'http://localhost:8080/QMTM_DEMO/mobile/exam/mytest.jsp';
let examDetailURL = 'http://localhost:8080/QMTM_DEMO/mobile/exam/etest.jsp';
let examPaperURL = 'http://localhost:8080/QMTM_DEMO/mobile/paper/etest.jsp';
let saveAnswerAndLogurl = 'http://localhost:8080/QMTM_DEMO/mobile/paper/saveans.jsp';
let scoreListURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/myscore.jsp';
let scoreDetailURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/scoreinfo.jsp';
let viewTestURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/qa.jsp';
let viewStaticURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/multistat.jsp';


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
      
      this.http.post(loginURL, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());  
        }, (err) => {
          reject(err);
        });
    });
  }

  
}
