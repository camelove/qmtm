import { Component, ViewChild } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MultistatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-multistat',
  templateUrl: 'multistat.html',
})
export class MultistatPage {

    @ViewChild('barCanvas') barCanvas;
    // @ViewChild('doughnutCanvas') doughnutCanvas;
    // @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    total_person:any;
    exam:any
    view_exam = { "userid":"", "id_exam":"" };
    arr= new Array();
    viewexams:any;
    view_score:any;
    my_data = {"Test_allotting":"","Test_avg":"", "Test_max":"","Test_min":"","Test_name":"","Test_qcount":"","Test_user_avg":"","Test_user_cnt":"","User_rank":"","User_score":"","User_score pct":""};


    constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
        let info = this.auth.getUserInfo();
        this.exam = this.navParams.get('exam');
       
        this.view_exam.id_exam =  this.exam.Test_code;
        this.view_exam.userid = info.userID;
        
        // console.log('Passed params', navParams.data);
        this.auth.view_static(this.view_exam).then((result) => {
       
        this.view_score = result;
        this.viewexams = this.view_score.A;
        this.my_data.Test_allotting = this.view_score.Test_allotting;
        this.my_data.Test_avg = this.view_score.Test_avg;
        this.my_data.Test_max = this.view_score.Test_max;
        this.my_data.Test_min = this.view_score.Test_min;
        this.my_data.Test_name = this.view_score.Test_name;
        this.my_data.Test_qcount = this.view_score.Test_qcount;
        this.my_data.Test_user_avg = this.view_score.Test_user_avg;
        this.my_data.Test_user_cnt = this.view_score.Test_user_cnt;
        this.my_data.User_rank = this.view_score.User_rank;
        this.my_data.User_score = this.view_score.User_score;
        this.my_data["User_score pct"] = this.view_score["User_score pct"];
       
        this.total_person = parseInt(this.my_data.Test_user_cnt)
        this.arr.push( parseInt(this.view_score.A));
        this.arr.push( parseInt(this.view_score.B));
        this.arr.push( parseInt(this.view_score.C));
        this.arr.push( parseInt(this.view_score.D));
        this.arr.push( parseInt(this.view_score.E));
        this.arr.push( parseInt(this.view_score.F));
        this.arr.push( parseInt(this.view_score.G));
        this.arr.push( parseInt(this.view_score.H));
        this.arr.push( parseInt(this.view_score.I));
        this.arr.push( parseInt(this.view_score.J));   
      })
    }
 
    ionViewDidEnter() {
        for (var i =0;i<this.arr.length;i++){
            this.arr[i] =   this.arr[i] /this.total_person *100;
         }

        this.barChart = new Chart(this.barCanvas.nativeElement, {           
            type: 'bar',
            data: {
                labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
                datasets: [{
                    // label: '# of Votes',
                    data: [this.arr[0], this.arr[1], this.arr[2], this.arr[3], this.arr[4], this.arr[5], this.arr[6], this.arr[7], this.arr[8],this.arr[9]],
                    backgroundColor: [
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F', 
                        '#FFA62F',  
                        '#FFA62F' 
                        /*
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                        */
                    ],
                    borderColor: [
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F' 
                      /*
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      */  
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });         
    }

    view_chart_abc() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
           
            type: 'bar',
            data: {
                labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
                datasets: [{
                    // label: '# of Votes',
                    data: [50, 0, 0, 0, 33, 70, 80, 0, 100, 0],
                    backgroundColor: [
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F',  
                        '#FFA62F', 
                        '#FFA62F',  
                        '#FFA62F' 
                        /*
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                        */
                    ],
                    borderColor: [
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F',  
                      '#FFA62F' 
                      /*
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      */  
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        }); 
    }
}
