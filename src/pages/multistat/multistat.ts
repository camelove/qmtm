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
    exam:any
    view_exam = { "userid":"", "id_exam":"" };
    viewexams:any;
    view_score:any;
    my_score = {"My_score":"","Test_name":"", "Test_allott":""};
    







    constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
        let info = this.auth.getUserInfo();
        this.exam = this.navParams.get('exam');
       
        this.view_exam.id_exam =  this.exam.Test_code;
        this.view_exam.userid = info.userID;
        
        // console.log('Passed params', navParams.data);
      this.auth.view_static(this.view_exam).then((result) => {
       
        this.view_score = result;
        // this.viewexams = this.view_score.Items;
        // this.my_score.My_score = this.view_score.My_score;
        // this.my_score.Test_name = this.view_score.Test_name;
        // this.my_score.Test_allott = this.view_score.Test_allott;
      })
      
      
    }
 
    ionViewDidLoad() {
 
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
                datasets: [{
                    // label: '# of Votes',
                    data: [50, 0, 0, 0, 33, 0, 0, 0, 100, 0],
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
