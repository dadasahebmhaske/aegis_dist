import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { FinanceService } from '../finance.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';

@Component({
  selector: 'sa-cheque-and-dd-payment-status-list',
  templateUrl: './cheque-and-dd-payment-status-list.component.html',
  styleUrls: ['./cheque-and-dd-payment-status-list.component.css']
})
export class ChequeAndDdPaymentStatusListComponent implements OnInit {
    public cpInfo: any = {};
    public chantype:any=[]; 
    public cust: any = {};
    public datePickerConfig: Partial<BsDatepickerConfig>;
    public cashFlowData: any = [];
    public gridOptions: IGridoption;
    public loaderbtn: boolean = true;
    public minDate: Date;
    public maxDate: Date = new Date();
    constructor(private appService: AppService, private customerService: CustomerService,private datashare:DatashareService, private financeService: FinanceService,private masterService:MasterService) {
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
      this.gridOptions.exporterExcelFilename = 'Cash Flow Register list.xlsx';
      let columnDefs = [];
      columnDefs = [
        {
          name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ConsNo !=null" ng-click="grid.appScope.editEmployee(row.entity)">&nbsp;Update&nbsp;</button> '
          , width: "71", exporterSuppressExport: true,
          headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Update</div>', enableFiltering: false
        },
  
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
      this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    onEditFunction = ($event) => {
      this.datashare.updateShareData($event.row);
      AppComponent.Router.navigate(['/finance/cheque-and-dd-payment-status']);
    }
    onLoad() {
      this.loaderbtn=false;
      this.cust = this.customerService.checkCustOrMobNo(this.cust);
      this.cust.StartDate = this.appService.DateToString(this.cust.StartDate)
      this.cust.EndDate = this.appService.DateToString(this.cust.EndDate)
      this.financeService.getChequeDDStatus(this.cust.CPCode, this.cust).subscribe((resData: any) => {
        this.loaderbtn=true;
        if (resData.StatusCode != 0) {
          this.cashFlowData = resData.Data; console.log(resData.Data);
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