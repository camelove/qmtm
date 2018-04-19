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

let loginURL = 'http://localhost:8080/QMTM_DEMO/mobile/user_check.jsp';
let examListURL = 'http://localhost:8080/QMTM_DEMO/mobile/exam/mytest.jsp';
let examDetailURL = 'http://localhost:8080/QMTM_DEMO/mobile/exam/etest.jsp';
let examPaperURL = 'http://localhost:8080/QMTM_DEMO/mobile/paper/etest.jsp';
let refreshPaperURL = 'http://localhost:8080/QMTM_DEMO/mobile/paper/etest.jsp';
let saveAnswerURL = 'http://localhost:8080/QMTM_DEMO/mobile/paper/saveans.jsp';
let scoreListURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/myscore.jsp';
let scoreDetailURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/scoreinfo.jsp';
let viewTestURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/qa.jsp';
let viewStaticURL = 'http://localhost:8080/QMTM_DEMO/mobile/score/multistat.jsp';
let submitURL = 'http://localhost:8080/QMTM_DEMO/mobile/paper/submitResult.jsp';

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

  // List global variable and object
  currentUser: User;
  login_url:any;
  examlisturl:any;
  examdetailurl:any;
  refreshpaperurl: any;
  scorelist_url:any;
  scoredetail_url:any;
  exampaperurl:any;
  submittedresulturl:any;
  viewscore_url:any;
  viewstatic_url:any;

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
  * Method logout() to user log out
  * TODO Something
  */
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  /*
  * Method isAuthenticated() method to check of current user
  * return value of current user
  */
  public isAuthenticated(credentials) {

   
  }
  
  /*
  * Method getUserInfo() method to get information of current user
  * return value of current user
  */
  public getUserInfo() : User{
    return this.currentUser;
    
  }

  /*
  * Method exam_list() to show exam list and select
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/exam/mytest.jsp
  * parameter: examListURL
  */
  public exam_list(currentUser) {
    this.examlisturl = examListURL+'?'+'userid='+currentUser.userID;  
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

  /*
  * Method exam_detail() to show detail exam
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/exam/etest.jsp
  * parameter: examDetailURL
  */
  public exam_detail(credentials) {
    
    this.examdetailurl = examDetailURL+'?'+'userid='+credentials.userid +'&'+"id_exam="+credentials.id_exam;

    return new Promise((resolve, reject) => {  
    let headers = new Headers();
    headers.append('content-type','application/json');

      this.http.get(this.examdetailurl).map(res => res.json()).subscribe(data => {
        console.log(data);
  
        console.log(data.headers);
        resolve(data);    
      });
    });
  }

  /*
  * Method score_list() to show score list and select
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/score/myscore.jsp
  * parameter: scoreListURL
  */
  public score_list(credentials) {

    this.scorelist_url = scoreListURL+'?'+'userid='+credentials.userID;
  return new Promise((resolve, reject) => {  
    let headers = new Headers();
    headers.append('content-type','application/json');

    this.http.get(this.scorelist_url).map(res => res.json()).subscribe(data => {
        console.log(data);
   
         console.log(data.headers);
          resolve(data);    
      });
    });
  }

  /*
  * Method score_detail() to show detail score
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/score/scoreinfo.jsp
  * parameter: scoreDetailURL
  */
  public score_detail(credentials) {

    this.scoredetail_url = scoreDetailURL+'?'+'userid='+credentials.userid+'&'+'id_exam='+credentials.id_exam;;
    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');
  
      this.http.get(this.scoredetail_url).map(res => res.json()).subscribe(data => {
          console.log(data);
     
           console.log(data.headers);
            resolve(data);
      
      });
    });      
  }

  /*
  * Method paper_etest() to show detail score
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/paper/etest.jsp
  * parameter: credentials
  */
  public paper_etest(credentials) {

    this.exampaperurl = examPaperURL+'?'+'userid='+credentials.userid+'&'+'id_exam='+credentials.id_exam;
    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');
  
      this.http.get(this.exampaperurl).map(res => res.json()).subscribe(data => {
        console.log(data);     
        console.log(data.headers);
        resolve(data);
      
      });
    });     

  }

  /*
  * Method paper_refresh() to show detail score
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/paper/etest.jsp
  * parameter: credentials
  */
 public paper_refresh(credentials) {

  this.refreshpaperurl = refreshPaperURL+'?'+'userid='+credentials.userid+'&'+'id_exam='+credentials.id_exam;
    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');

      this.http.get(this.refreshpaperurl).map(res => res.json()).subscribe(data => {
          console.log(data);     
          console.log(data.headers);
          resolve(data);    
          console.log("|200 status|");
      });
    });
  }
  
  /*
  * Method submitted_result() to show detail score
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/paper/etest.jsp
  * parameter: credentials
  */
  public submitted_result(credentials) {

    this.submittedresulturl = submitURL+'?'+'userid='+credentials.userid+'&'+'id_exam='+credentials.Test_code + '&yn_open_score_direct='+credentials.yn_open_score_direct+'&allotting=' + credentials.allotting+'&qcount='+credentials.qcount;
    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');
  
      this.http.get(this.submittedresulturl).map(res => res.json()).subscribe(data => {
        console.log(data);     
        console.log(data.headers);
        resolve(data);
      
      });
    });     

  }

  /*
  * Method save_answer_and_log() to show detail score
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/paper/etest.jsp
  * parameter: saveAnswerAndLogURL
  */
 save_ans(credentials){
  
  let headers = new Headers(
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let body = 'userid=' + credentials.userid + '&id_exam=' + credentials.id_exam+"&answers="+credentials.answers+"&remain_time="+credentials.remain_time;
    
  return new Promise((resolve, reject) => {
    this.http.post(saveAnswerURL, 
      body, { headers: headers })
    .toPromise()
    .then((response) =>
    {
      console.log('API Response : ', response.json());
      resolve(response.json());
    })
   
  });

  }

  Submit_ans(credentials) {
  
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let body = 'userid=' + credentials.userid + '&id_exam=' + credentials.id_exam+"&answers="+credentials.answers+"&yn_open_score_direct="+credentials.yn_open_score_direct+"&remain_time="+credentials.remain_time;
      
    return new Promise((resolve, reject) => {
      this.http.post(submitURL, 
        body, { headers: headers })
      .toPromise()
        .then((response) =>
        {
          console.log('API Response : ', response.json());
          resolve(response.json());
        })
     
        });  
    }

  /*
  * Method view_score() to show view score
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/score/qa.jsp
  * parameter: viewTestURL
  */
  public view_score(credentials) {

    this.viewscore_url = viewTestURL+'?'+'userid='+credentials.userid +'&'+"id_exam="+credentials.id_exam;

    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');
  
        this.http.get(this.viewscore_url).map(res => res.json()).subscribe(data => {
          console.log(data);
    
          console.log(data.headers);
          resolve(data);    
        });
      });
  }
   
  /*
  * Method view_static() to show detail static
  * URL: http://192.168.100.9:8080/QMTM_DEMO/mobile/score/multistat.jsp
  * parameter: viewStaticURL
  */
  public view_static(credentials) {

    this.viewstatic_url = viewStaticURL+'?'+'userid='+credentials.userid +'&'+"id_exam="+credentials.id_exam;

    return new Promise((resolve, reject) => {  
      let headers = new Headers();
      headers.append('content-type','application/json');
  
        this.http.get(this.viewstatic_url).map(res => res.json()).subscribe(data => {
          console.log(data);
    
        
          resolve(data);    
        });
      });
  } 

}
