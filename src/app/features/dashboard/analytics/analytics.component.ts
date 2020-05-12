import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCalendar from "@app/core/store/calendar";
import { AnalyticsService } from './analytics.service';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  @Input() public state = {
    targetsShow: true,
    actualsShow: true,
    signupsShow: true
  };
  public revenueData: Array<any>;
  public chartjsData: any={};chartjsData1: any={};
  public calendar$
  public loaderbtn:boolean=true;

  public cpInfo: any = {};
  public selectedDate:any=new Date();
  public per:number=55;
  public showpie:boolean=false;
  public   ticks = []; pending = []; undelivered = []; delivered = [];
  public CountsData:any;
  public statusWise:any;
  public maxDate: Date = new Date();
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public topThreeDelBoy:any=[];
  public transactionSummary:any;
  constructor(
    private store: Store<any>,private analyicsService:AnalyticsService,private appService: AppService, private datashare: DatashareService, private masters: MasterService
  ) {
    this.calendar$ = this.store.select(fromCalendar.getCalendarState);
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange',maxDate:this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }

  ngOnInit() {
    this.per=44;
    setTimeout(() => {
      this.showpie=true; 
    },500);
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.statusWise='DM';
    this.updateData();
    this.pieChartOption(); this.DMPieChartOption();
   
  }
  pieChartOption(){
    this.chartjsData={
      "pie-chart": {
        "datasets":[{
          "data":[28,39,27],
           "backgroundColor": [
                "#a84242",
                "#71843F",
                "#3276B1",
                // "#949FB1",
                // "#4D5360"
            ],
           "hoverBackgroundColor": [
            "#a84242",
            "#71843F",
            "#3276B1",
              //   "rgba(220,220,220,0.7)",
              //  "rgba(151,187,205,0.8)",
              //   "rgba(169, 3, 41, 0.7)",
                // "#A8B3C5",
                // "#616774"
            ],
          "label":"My dataset"}],      
        "labels":[
           "Pending",
            "Delivered",
            "Undelivered",
            // "Grey",
            // "Dark Grey"
        ]
      }
    }
  }
  
//bargraph start
  updateData() {
    let data = [];
    if (this.state.targetsShow) data.push(this.getTargetsData());
    if (this.state.actualsShow) data.push(this.getActualsData());
   if (this.state.signupsShow) data.push(this.getSignupsData());
    this.revenueData = data;
  }

  // rev1enueChartOptions = {
  //   grid: {
  //     show: true,
  //     hoverable: true,
  //     clickable: true,
  //     borderWidth: 0
  //   },
  //   tooltip: true,
  //   tooltipOpts: {
  //     defaultTheme: false
  //   },
  //   xaxis: {
  //     mode: "time",
  //   },
  //   yaxes: {
  //     tickFormatter: function (val, axis) {
  //       return "$" + val;
  //     },
  //     max: 1200
  //   }
  // };
  
  revenueChartOptions = {
    grid: {
       //show: true,
      hoverable: true,
      // clickable: true,
      // borderWidth: 0
    },
    tooltip: true,
    tooltipOpts: {
      content: "<b>%s</b> = <span>%y</span>",
      defaultTheme: false
    },
    xaxis: {
      tickLength: 0,
      ticks: [[0,'Funsuk'],[1,'Wangud'],[2,'Ali khan'],[3,'Gupchili'],[4,'Kakkar'],[5,'Thakkar'],[6,'Khali bawali'],[7,'Bhahubali'],[8,'Kattapa'],[9,'Devsena'],[10,'Jaydrath'],[11,'Mandakshi wangukasdae']],//this.ticks,
      rotateTicks: 45,
    
    },
    yaxes: {
      tickFormatter: function (val, axis) {
        return val;
      },
      min: 0,
      tickDecimals: 0
    },  legend: {
      show: false
  }
  };
  
  
  // private getTargetsData() {
  //   return {
  //     label: "Target Profit",
  //     data: [[1354586000000, 153], [1364587000000, 658], [1374588000000, 198], [1384589000000, 663], [1394590000000, 801], [1404591000000, 1080], [1414592000000, 353], [1424593000000, 749], [1434594000000, 523], [1444595000000, 258], [1454596000000, 688], [1464597000000, 364]],
  //     bars: {
  //       show: true,
  //       align: "center",
  //       barWidth: 30 * 30 * 60 * 1000 * 80
  //     }
  //   }
  // }
  private getTargetsData() {
    return {
      label: "Pending",
      data:[[0,10],[1,12],[2,9],[3,15],[4,10],[5,19],[6,17],[7,10],[8,11],[9,18],[10,10],[11,5]], //this.pending,
      bars: {
        show: true,
        align: "center",
        barWidth: 0.4,
     
        numbers: {
          show: true,

          xAlign: function (x) { return x + 0; },
          yAlign: function (y) { return y - (y / 2); },
          font: { font: 'Arial', size: '100%', color: '#fff' }
      }
      }
    }
  }
  
  private getActualsData() {
    return {
      label: "Undelivered",
      data:[[0,8],[1,12],[2,9],[3,10],[4,10],[5,9],[6,7],[7,15],[8,11],[9,18],[10,10],[11,5]],// this.undelivered
      color: '#3276B1',
      lines: {
        show: true,
        lineWidth: 3
      },
      points: {
        show: true
      }
    };
  }

  private getSignupsData() {
    return {
      label: "Delivered",
      data:[[0,1],[1,2],[2,4],[3,1],[4,7],[5,19],[6,17],[7,5],[8,6],[9,8],[10,5],[11,3]], //this.delivered
      color: '#71843F',
      lines: {
        show: true,
        lineWidth: 1
      },
      points: {
        show: true
      }
    }
  }
//bargraph end
getDashboardGraphData(){
  this.analyicsService.getDashboradGrapghData(this.cpInfo.CPCode,this.statusWise,this.appService.DateToString(this.selectedDate)).subscribe((resData: any) => {
    if(resData.StatusCode!=0){                     
      this.CountsData = resData.Data;
      for (var i = 0; i <this.CountsData.length; i++) {
        if (this.statusWise == "DM") {
          this.ticks.push([i,this.CountsData[i].DManName]);}else if(this.statusWise == "AM"){
            this.ticks.push([i,this.CountsData[i].AreaName]);
          }
          this.pending.push([i,this.CountsData[i].PendingCashMemo]);
          this.undelivered.push([i,this.CountsData[i].UnDeliveredCount]);
          this.delivered.push([i,this.CountsData[i].DeliveredCount]);
    }}
    else {  AppComponent.SmartAlert.Errmsg(resData.Message); }
  });
}
getTopThreeDeliveryBoy(){
  this.analyicsService.getTopThreeDeliveryBoy(this.cpInfo.CPCode,this.appService.DateToString(this.selectedDate)).subscribe((resD: any) => {
    if(resD.StatusCode!=0){                     
      this.topThreeDelBoy = resD.Data; }
    else {  AppComponent.SmartAlert.Errmsg(resD.Message); }
 });
}
getpieChartData(){
  this.analyicsService.getpieChartData(this.cpInfo.CPCode,this.appService.DateToString(this.selectedDate)).subscribe((resP: any) => {
    if(resP.StatusCode!=0){                     
      this.topThreeDelBoy = resP.Data; }
    else {  AppComponent.SmartAlert.Errmsg(resP.Message); }
 });
}
getRefillTransactionSummary(){
  this.analyicsService.getRefillTransactionSummary(this.cpInfo.CPCode,this.appService.DateToString(this.selectedDate)).subscribe((resTS: any) => {
    if(resTS.StatusCode!=0){                     
      this.transactionSummary = resTS.Data; }
    else {  AppComponent.SmartAlert.Errmsg(resTS.Message); }
 });
}
getDeliveryBoyWiseAnalysis(){
  this.analyicsService.getRefillTransactionSummary(this.cpInfo.CPCode,this.appService.DateToString(this.selectedDate)).subscribe((resDS: any) => {
    if(resDS.StatusCode!=0){                     
      this.transactionSummary = resDS.Data; }
    else {  AppComponent.SmartAlert.Errmsg(resDS.Message); }
 });
}

DMPieChartOption(){
  this.chartjsData1={
      "datasets":[{
        "data":[40,39,27],
         "backgroundColor": ["#a84242","#71843F","#3276B1" ],
         "hoverBackgroundColor": [ "#a84242", "#71843F", "#3276B1"],
        "label":"My dataset"}],      
      "labels":["Pending", "Delivered","Undelivered"]
  
}}

}
