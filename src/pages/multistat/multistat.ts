import { Component, ViewChild } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';


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
 
    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewDidLoad() {
 
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
                datasets: [{
                    // label: '# of Votes',
                    data: [33, 0, 0, 0, 33, 0, 0, 0, 100, 0],
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
