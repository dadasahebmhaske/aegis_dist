
import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { OrderService } from '@app/features/order/order.service';
import { FinanceService } from '../finance.service';
@Component({
  selector: 'sa-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {

    public availAmt:any;
      public cpInfo: any = {};
      public chantype:any=[];
      public cust: any = {};
      public datePickerConfig: Partial<BsDatepickerConfig>;
      public cashFlowData: any = [];
      public gridOptions: IGridoption;
      public gridOptions1: IGridoption;
      public imgUrl:any;
      public loaderbtn: boolean = true;
      public minDate: Date;
      public maxDate: Date = new Date();
      public pettyCashData:any=[];
      public transfer:any={}
      constructor(private appService: AppService, private customerService: CustomerService, private financeService: FinanceService,private masterService:MasterService) {
        this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
      }
      ngOnInit() {
        this.appService.getAppData().subscribe(data => { this.cpInfo = data;this.cust.CPCode= this.cpInfo.CPCode; });
        this.cust.StartDate = this.cust.EndDate = new Date();
        this.onloadAll();
        this.configureGrid(); 
      }
      onloadAll(){
        this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
          if (resCP.StatusCode != 0)
            this.chantype = resCP.Data;
            this.chantype.unshift(  {CPCode: this.cpInfo.CPCode,CPName: this.cpInfo.CPName});
        });
      }
      configureGrid() {
        this.gridOptions = <IGridoption>{}
        this.gridOptions.exporterMenuPdf = false;
        this.gridOptions.selectionRowHeaderWidth = 0;
        this.gridOptions.exporterExcelFilename = 'Expenses list.xlsx';
        let columnDefs = [];
        columnDefs = [
          {
            name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ImageName !=null" ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#transferModal">&nbsp;View&nbsp;</button> '
            , width: "55", exporterSuppressExport: true,
            headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">View</div>', enableFiltering: false
          },
          { name: 'EmpName', displayName: 'Employee ', width: "200", cellTooltip: true, filterCellFiltered: true },
          { name: 'ExpType', displayName: 'Expenses Type', width: "150", cellTooltip: true, filterCellFiltered: true },
          { name: 'CreditAmount', displayName: 'Expenses Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
          { name: 'DebitAmount', displayName: 'Return Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
          { name: 'CrDbFlag', displayName: 'Cr/Dr', cellClass: 'cell-center', width: "80", cellTooltip: true, filterCellFiltered: true },
          { name: 'TotalExpenses', displayName: 'Total Expenses', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
          { name: 'ExpDate', displayName: 'Expenses Date', cellClass: 'cell-center', width: "180", cellTooltip: true, filterCellFiltered: true },
          { name: 'CreatedBy', displayName: 'Expenses Added By', width: "200", cellTooltip: true, filterCellFiltered: true },
        { name: 'Remark', displayName: 'Remark', width: "250", cellTooltip: true, filterCellFiltered: true },
        
        ]
        this.gridOptions.columnDefs = columnDefs;
        this.onLoad();
      }
      onEditFunction = ($event) => {
       this.imgUrl = `${AppComponent.ImageUrlDist}${$event.row.ImageName}`;
      }
      onLoad() {
        this.loaderbtn=false;
        //this.cust = this.customerService.checkCustOrMobNo(this.cust);
        this.cust.StartDate = this.appService.DateToString(this.cust.StartDate)
        this.cust.EndDate = this.appService.DateToString(this.cust.EndDate)
        this.financeService.getExpensesDeatils(this.cust.CPCode, this.cust).subscribe((resData: any) => {
          this.loaderbtn=true;
          if (resData.StatusCode != 0) {
            this.cashFlowData = resData.Data; 
            AppComponent.SmartAlert.Success(resData.Message);
          }
          else { this.cashFlowData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
      }
               resetEndDate(val) {
        this.minDate = val;
        if (val != undefined && val != null && this.cust.EndDate != null) {
          if ((new Date(this.cust.EndDate).getTime()) < (new Date(val).getTime())) {
            this.cust.EndDate = '';
          }
        }
      }
  
    }