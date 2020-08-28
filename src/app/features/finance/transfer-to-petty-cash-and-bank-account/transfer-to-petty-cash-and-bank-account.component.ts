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
  selector: 'sa-transfer-to-petty-cash-and-bank-account',
  templateUrl: './transfer-to-petty-cash-and-bank-account.component.html',
  styleUrls: ['./transfer-to-petty-cash-and-bank-account.component.css']
})
export class TransferToPettyCashAndBankAccountComponent implements OnInit {

  public cpInfo: any = {};
  public chantype: any = [];
  public cust: any = { TransferTo: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public cashFlowData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public selectedRows: any = [];
  public transfer: any = { transferTo: '' };
  public transferHide: boolean = true;

  constructor(private appService: AppService, private customerService: CustomerService, private financeService: FinanceService, private orderService: OrderService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data; this.cust.CPCode = this.cpInfo.CPCode; });
    this.cust.StartDate = this.cust.EndDate = new Date();
    this.configureGrid(); this.cashFlowData=[{}];
    this.onloadAll();
  }
  onloadAll() {
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
      this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName });
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Transfer To Petty Cash And Bank Account list.xlsx';
    //    this.gridOptions.multiSelect = true;
    // this.gridOptions.enableRowSelection = true;
    // this.gridOptions.enableSelectAll = true;
    // this.gridOptions.enableRowHeaderSelection = true;
    let columnDefs = [];
    this.gridOptions.selectionRowHeaderWidth = 35;
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
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    // AppComponent.Router.navigate(['/master/vehicle']);
  }
  onSelectFunction = ($event) => {
    this.selectedRows = $event.row;
    this.transferHide = this.selectedRows.length > 0 ? false : true;
    //this.datashare.updateShareData($event.row);
  }
  onLoad() {
    this.loaderbtn = false;
    // this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.cust.StartDate = this.appService.DateToString(this.cust.StartDate)
    this.cust.EndDate = this.appService.DateToString(this.cust.EndDate)
    this.financeService.getAccountForTransfer(this.cust.CPCode, this.cust).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.cashFlowData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.cashFlowData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  transferToAccount() {
    this.transfer.CPCode = this.cust.CPCode;
    this.transfer.DebitAmount = 0;
     this.transfer.CrDbFlag = 'CR';
    this.transfer.TransferFlag = 'CL';
    this.transfer.IsActive = 'Y';
    this.transfer.UserCode = this.cpInfo.EmpId;
    if (this.selectedRows.length > 0 && Object.keys(this.selectedRows[0]).length > 1) {
      let bdata = [], CreditAmount = 0, RefNos = '';
      for (let i = 0; i < this.selectedRows.length; i++) {
        CreditAmount = CreditAmount + this.selectedRows[i].PaidAmount;
        if (RefNos == '')
          {RefNos = `${this.selectedRows[i].PayRegId}`;}
          else{RefNos = `${RefNos},${this.selectedRows[i].PayRegId}`;}
        bdata.push({
          'RefNo': this.selectedRows[i].PayRegId
        });
      }
      this.transfer.CreditAmount = CreditAmount;
      this.transfer.RefNos = RefNos;
      this.transfer.data = bdata;
      let api = this.transfer.transferTo == 'PC' ? 'InsertPettyCashAccount' : 'InsertBankAccount';
      this.loaderbtn=false;
      this.financeService.postTransferToAccount(this.transfer,api).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.onLoad();
          $('#transferModal').modal('hide');
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });

    } else {
      AppComponent.SmartAlert.Errmsg(`Please select atleast one record`);
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