  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
  import { AppComponent } from '../../../app.component';
  import { OrderService } from '@app/features/order/order.service';
  import { AppService } from '@app/core/custom-services/app.service';
  import { DatashareService } from '@app/core/custom-services/datashare.service';
  import { MasterService } from '@app/core/custom-services/master.service';
  import { BsDatepickerConfig } from 'ngx-bootstrap';
  import { CustomerService } from '@app/features/customer/customer.service';
  @Component({
    selector: 'sa-customer-wise-product-details',
    templateUrl: './customer-wise-product-details.component.html',
    styleUrls: ['./customer-wise-product-details.component.css']
  })
  export class CustomerWiseProductDetailsComponent implements OnInit, OnDestroy {
    public cpInfo: any = {};
    public chantype: any = [];
    //public CustTypeData: any = [];
    public datePickerConfig: Partial<BsDatepickerConfig>;
    public customerProductData: any = [];
    public delBoyData: any = [];
    public deliverFilter: any = { DelUserCode: '', CustTypeId: '' };
    public gridOptions: IGridoption;
    public loaderbtn: boolean = true;
    public minDate: Date;
    public StartMindate: Date;
    public maxDate: Date = new Date();
    //public ProductArray: any = [];
    constructor(private appService: AppService, private customerService: CustomerService, private datashare: DatashareService, private masterService: MasterService, private orderService: OrderService) {
      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
    }
    ngOnInit() {
      this.appService.getAppData().subscribe(data => { this.cpInfo = data; this.deliverFilter.CPCode = this.cpInfo.CPCode; });
      this.deliverFilter.StartDate = this.deliverFilter.EndDate = new Date();
      this.allOnLoad();
      this.configureGrid(); this.customerProductData = [{}];
    }
    allOnLoad() {
      this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
        if (resCP.StatusCode != 0)
          this.chantype = resCP.Data;
        this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName });
      });
      // this.customerService.getCustomerType().subscribe((respCt) => {
      //   if (respCt.StatusCode != 0)
      //     this.CustTypeData = respCt.Data;
      // });

    }
    configureGrid() {
      this.gridOptions = <IGridoption>{}
      this.gridOptions.exporterMenuPdf = false;
      this.gridOptions.exporterExcelFilename = 'Customer Wise Product Details.xlsx';
      let columnDefs = [];
      columnDefs = [
        // {
        //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ConsNo !=null" ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
        //   , width: "71", exporterSuppressExport: true,
        //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
        // },
        { name: 'ConsNo', displayName: 'Customer No.', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
        { name: 'ConsName', displayName: 'Customer Name', width: "220", cellTooltip: true, filterCellFiltered: true },
        { name: 'MobileNo', displayName: 'Mobile No.', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
        { name: 'AreaName', displayName: 'Area ', width: "160", cellTooltip: true, filterCellFiltered: true },
        { name: 'SubAreaName', displayName: 'SubArea ', width: "160", cellTooltip: true, filterCellFiltered: true },
        { name: 'SVNumber', displayName: 'SV No.', cellClass: 'cell-center', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'ProdSeg', displayName: 'Product Segment', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'Product', displayName: 'Product', width: "200", cellTooltip: true, filterCellFiltered: true },
        { name: 'CreatedDt', displayName: 'Created Date', cellClass: 'cell-center', width: "150", cellTooltip: true },
        { name: 'PurchaseQty', displayName: 'Purchase Qty', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'DepositAmt', displayName: 'Deposit Amt', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
        { name: 'RefundableAmt', displayName: 'Value of Product Paid', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'TotalDepositAmt', displayName: 'Total Deposit Amt', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'TotalRefundableAmt', displayName: 'Total Refundable Amt', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
        { name: 'MonthlyConsumption', displayName: 'Monthly Consumption', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
      ]
      this.gridOptions.columnDefs = columnDefs;
      //this.onLoad();
    }
    onEditFunction = (event) => {
    }
    onLoad() {
      this.loaderbtn = false;
      this.deliverFilter = this.customerService.checkCustOrMobNo(this.deliverFilter);
      this.customerService.getCustomerWiseProductDetails(this.deliverFilter.CPCode, this.deliverFilter, this.appService.DateToString(this.deliverFilter.StartDate), this.appService.DateToString(this.deliverFilter.EndDate)).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.customerProductData = resData.Data; console.log(resData.Data);
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.customerProductData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
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
    ngOnDestroy() {
      this.appService.removeBackdrop();
      //this.stockOrdersData = [{}];
    }
  
  } 