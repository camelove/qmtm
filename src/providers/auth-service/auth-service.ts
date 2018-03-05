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
let myTestURL = 'http://localhost:8080/QMTM_DEMO/mobile/exam/mytest.jsp';
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
  constructor(public http: Http) {
    console.log('AuthServiceProvider Provider');
  }

  /*
  * Method authenLogin() to credential and authen userid and password..
  * URL: http://192.168.100.2:8080/QMTM_DEMO/mobile/user_check.jsp
  */
  public authenLogin(credentials) {

    /* if (credentials.userID === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    }
    else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('test1', 'test1');
        observer.next(access);
        observer.complete();
      });
    } */
    this.login_url = loginURL+'?'+'userid='+credentials.userID +'&'+'password='+credentials.password;
    // check status of url when debug on broswers
    this.http.get(this.login_url).subscribe(data => {
      console.log(data);
    });

    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      this.http.post(this.login_url, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());      // .data
        }, (err) => {
          reject(err);
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

  
  
}
