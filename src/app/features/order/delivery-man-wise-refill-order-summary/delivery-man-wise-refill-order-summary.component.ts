import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { OrderService } from '../order.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MasterService } from '@app/core/custom-services/master.service';
import { SettingService } from '@app/features/settings/setting.service';
@Component({
  selector: 'sa-delivery-man-wise-refill-order-summary',
  templateUrl: './delivery-man-wise-refill-order-summary.component.html',
  styleUrls: ['./delivery-man-wise-refill-order-summary.component.css']
})
export class DeliveryManWiseRefillOrderSummaryComponent implements OnInit {
  public cpInfo: any = {};
  public chantype:any=[]; 
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public deliverFilter: any = { DelUserCode: '' };
  public delBoyData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public unDeliveredOrderData: any = [];
  constructor(private appService: AppService, private masterService: MasterService, private orderService: OrderService,private settingService:SettingService ) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data;this.deliverFilter.CPCode= this.cpInfo.CPCode; });
    this.deliverFilter.StartDate = this.deliverFilter.EndDate = new Date();
    this.allOnLoad();
    this.configureGrid();
  }
  allOnLoad() {
    this.settingService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
        this.chantype.unshift(  {CPCode: this.cpInfo.CPCode,CPName: this.cpInfo.CPName});
    });

    // this.masterService.getEmpoyeeDelBoy(this.cpInfo.CPCode).subscribe((respD: any) => {
    //   if (respD.StatusCode != 0)
    //     this.delBoyData = respD.Data;
    // });
  
    this.onCPChange(this.cpInfo.CPCode);
  }
  onCPChange(cpcode){
  this.masterService.getEmpoyeeDelBoy(cpcode).subscribe((respD: any) => {
      if (respD.StatusCode != 0)
       { this.delBoyData = respD.Data;}else{
        this.delBoyData = [];
       }
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Delivery Man Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [

      { name: 'DelUserName', displayName: 'Delivery Boy', width: "190", cellTooltip: true, filterCellFiltered: true },
      { name: 'DeliveryCount', displayName: 'Delivered Count', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      // { name: 'DACDeliveredCount', displayName: 'DAC Delivered Count', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'UnDeliveryCount', displayName: 'Undelivered Count', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalProdDelivered', displayName: 'Product Delivered', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalRefillAmount', displayName: 'Refill Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalDiscount', displayName: 'Discount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalSalesAmt', displayName: 'Sales Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalPaymentCollected', displayName: 'Payment Collected', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalPendingAmt', displayName: 'Pending Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalEmptyReturn', displayName: 'Empty Return', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'DelDate', displayName: 'Delivery Date', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'BatteryLevel', displayName: 'Battery Level', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
  }
  onLoad() {
    this.loaderbtn = false;
    this.deliverFilter.StartDate = this.appService.DateToString(this.deliverFilter.StartDate);
    this.deliverFilter.EndDate = this.appService.DateToString(this.deliverFilter.EndDate);
    this.orderService.getDelManWiseData(this.deliverFilter.CPCode, this.deliverFilter).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.unDeliveredOrderData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.unDeliveredOrderData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.deliverFilter.EndDate != null) {
      if ((new Date(this.deliverFilter.EndDate).getTime()) < (new Date(val).getTime())) {
        this.deliverFilter.EndDate = '';
      }
    }
  }
}