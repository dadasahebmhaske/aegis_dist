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
  selector: 'sa-petty-cash-details-list',
  templateUrl: './petty-cash-details-list.component.html',
  styleUrls: ['./petty-cash-details-list.component.css']
})
export class PettyCashDetailsListComponent implements OnInit {
  public availAmt:any;
    public cpInfo: any = {};
    public chantype:any=[];
    public cust: any = {};
    public datePickerConfig: Partial<BsDatepickerConfig>;
    public cashFlowData: any = [];
    public gridOptions: IGridoption;
    public gridOptions1: IGridoption;
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
      this.configureGrid(); this.configureDeatilsGrid();
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
      this.gridOptions.exporterExcelFilename = 'Petty Cash list.xlsx';
      let columnDefs = [];
      columnDefs = [
        {
          name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.PettyCashId !=null" ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#transferModal">&nbsp;View&nbsp;</button> '
          , width: "55", exporterSuppressExport: true,
          headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">View</div>', enableFiltering: false
        },

        { name: 'CreditAmount', displayName: 'Credit Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'DebitAmount', displayName: 'Debit Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'CrDbFlag', displayName: 'Cr/Dr', cellClass: 'cell-center', width: "80", cellTooltip: true, filterCellFiltered: true },
        { name: 'AvlPettyCash', displayName: 'Petty Cash Amt', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'PettyCashDate', displayName: 'Petty Cash Date', cellClass: 'cell-center', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'CreatedBy', displayName: 'Petty Cash Added By', width: "200", cellTooltip: true, filterCellFiltered: true },
        { name: 'TransferFlag', displayName: 'Transfer From', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'Remark', displayName: 'Remark', width: "250", cellTooltip: true, filterCellFiltered: true },
      ]
      this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    configureDeatilsGrid() {
      this.gridOptions1 = <IGridoption>{}
      this.gridOptions1.exporterMenuPdf = false;
      this.gridOptions1.exporterExcelFilename = 'Petty Cash Transfer Details.xlsx';
      let columnDefs = [];
      columnDefs = [
        { name: 'ConsNo', displayName: 'Customer No.', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true, visible: true },
        { name: 'ConsName', displayName: 'Customer Name', width: "250", cellTooltip: true, filterCellFiltered: true },
        { name: 'MobileNo', displayName: 'Mobile No.', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
        { name: 'PayDate', displayName: 'Payment Date', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'SalesAmount', displayName: 'Sales Amount', cellClass: 'cell-right', width: "130", cellTooltip: true, filterCellFiltered: true },
        { name: 'PaidAmount', displayName: 'Received Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'PendingAmt', displayName: 'Pending Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'AdvanceAmt', displayName: 'Advanced Amount', cellClass: 'cell-right', width: "155", cellTooltip: true, filterCellFiltered: true },
        { name: 'PayMode', displayName: 'Payment Mode', width: "140", cellTooltip: true, filterCellFiltered: true },
        { name: 'ChequeNo', displayName: 'Cheque No.', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
        { name: 'ChequeDate', displayName: 'Cheque Date', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
        { name: 'CollectedByUserName', displayName: 'Payment Collected By', width: "200", cellTooltip: true, filterCellFiltered: true },
        { name: 'PayStatus', displayName: 'Payment Status', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'PayStatusDate', displayName: 'Payment Status Date', cellClass: 'cell-center', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'AccountType', displayName: 'Account Type', width: "200", cellTooltip: true, filterCellFiltered: true },
        { name: 'Remark', displayName: 'Remark', width: "200", cellTooltip: true, filterCellFiltered: true },
   
      ]
      this.gridOptions1.columnDefs = columnDefs;
 
    }
    onEditFunction = ($event) => {
     console.log($event.row);
     this.configureDeatilsGrid();
     this.financeService.getPettyCashDetails($event.row.PettyCashId).subscribe((resDat: any) => {
      this.loaderbtn=true;
      if (resDat.StatusCode != 0) {
        this.pettyCashData = resDat.Data;console.log(resDat.Data);
        AppComponent.SmartAlert.Success(resDat.Message);
      }
      else { this.pettyCashData = [{}]; AppComponent.SmartAlert.Errmsg(resDat.Message); }
    });
    }
    onLoad() {
      this.loaderbtn=false;
      //this.cust = this.customerService.checkCustOrMobNo(this.cust);
      this.cust.StartDate = this.appService.DateToString(this.cust.StartDate)
      this.cust.EndDate = this.appService.DateToString(this.cust.EndDate)
      this.financeService.getPettyCashData(this.cust.CPCode, this.cust).subscribe((resData: any) => {
        this.loaderbtn=true;
        if (resData.StatusCode != 0) {
          this.cashFlowData = resData.Data; 
          this.availAmt=this.cashFlowData[0].AvlPettyCash;
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.cashFlowData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
    transferToAccount() {
      if(this.transfer.CreditAmount<this.availAmt){
        this.transfer.CPCode = this.cust.CPCode;
        this.transfer.DebitAmount = 0;
         this.transfer.CrDbFlag = 'CR';
        this.transfer.TransferFlag = 'PC';
        this.transfer.IsActive = 'Y';
        this.transfer.UserCode = this.cpInfo.EmpId;
         // this.transfer.CreditAmount = CreditAmount;
          this.transfer.RefNos = '';
          this.transfer.data = [{RefNo:''}];
          let api = 'InsertBankAccount';
          this.loaderbtn=false;
          this.financeService.postTransferToAccount(this.transfer,api).subscribe((resData: any) => {
            this.loaderbtn = true;
            if (resData.StatusCode != 0) {
              AppComponent.SmartAlert.Success(resData.Message);
              this.onLoad();
              $('#bankModal').modal('hide');
            }
            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
          });
      }else{
        AppComponent.SmartAlert.Errmsg('Petty Cash is not sufficient');
      }
      
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