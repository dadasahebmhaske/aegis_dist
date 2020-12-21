import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MasterService } from '@app/core/custom-services/master.service';
import { CustomerService } from '@app/features/customer/customer.service';
import { OrderService } from '@app/features/order/order.service';
@Component({
  selector: 'sa-client-outstanding-and-due-date-summary',
  templateUrl: './client-outstanding-and-due-date-summary.component.html',
  styleUrls: ['./client-outstanding-and-due-date-summary.component.css']
})
export class ClientOutstandingAndDueDateSummaryComponent implements OnInit {
  public areaOrderData: any = [];
  public AreaData = [];
  public cpInfo: any = {};
  public chantype: any = [];
  public cmCustData: any = {};
  public cashmemo: any = { areacode: '' };
  public CashMemoData: any = {};
  public cust: any = { AreaId: '', RouteId: '', SubAreaId: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public RouteData: any = [];
  public SubAreaArray: any = [];
  public SubAreaData: any = [];
  public RouteArray: any = [];

  constructor(private appService: AppService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data; this.cust.CPCode = this.cpInfo.CPCode; this.getArea(); });
    this.cust.StartDate = this.cust.EndDate = new Date();
    this.onloadAll();
    this.configureGrid(); this.areaOrderData = [{}];
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.selectionRowHeaderWidth = 0;
    this.gridOptions.exporterExcelFilename = 'Customer Outstanding And Due Date Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ConsName', displayName: 'Customer Name', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'CustType', displayName: 'Customer Type', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'AreaName', displayName: 'Area', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'PinCode', displayName: 'Pincode', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'InvoiceNo', displayName: 'Invoice No', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'InvoiceDate', displayName: 'Invoice Date', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'InvoiceValue', displayName: 'Invoice Value', cellClass: 'cell-right', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'AmountOS', displayName: 'Amount O/S', cellClass: 'cell-right', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'AmountDueToday', displayName: 'Overdue Days', cellClass: 'cell-right', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'AmountDueDate', displayName: 'Amount Due Date', cellClass: 'cell-center', width: "180", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    //this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    // AppComponent.Router.navigate(['/master/vehicle']);
  }
  onLoad() {
    this.loaderbtn = false;
    this.cust.RouteId = this.cust.RouteId == null ? '' : this.cust.RouteId;
    this.cust.SubAreaId = this.cust.SubAreaId == null ? '' : this.cust.SubAreaId;
    this.cust.StartDate = this.appService.DateToString(this.cust.StartDate);
    this.cust.EndDate = this.appService.DateToString(this.cust.EndDate);
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.customerService.getClientOutsatandingDueDateSummary(this.cust.CPCode, this.cust).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.areaOrderData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.areaOrderData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onloadAll() {
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
      this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName });
    });
    this.onCPChange(this.cpInfo.CPCode)
  }
  onCPChange(cpcode) {

    this.masterService.getRoutes(cpcode).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.RouteArray = resR.Data;
    });
  }
  getArea() {
    this.masterService.getArea(this.cust.CPCode).subscribe((resAR: any) => {
      if (resAR.StatusCode != 0) { this.AreaData = resAR.Data; } else {
        this.AreaData = [];
      }
      this.getSubArea();
    });

  }
  getSubArea() {
    this.masterService.getSubArea(this.cust.CPCode, this.cust.AreaId).subscribe((reSA: any) => {
      if (reSA.StatusCode != 0) {
        this.SubAreaData = this.SubAreaArray = reSA.Data;
      } else { this.SubAreaData = this.SubAreaArray = []; }
      this.getRoute();
    });
  }
  getRoute() {
    this.RouteData = this.masterService.filterData(this.RouteArray, this.cust.SubAreaId, 'SubAreaId');
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