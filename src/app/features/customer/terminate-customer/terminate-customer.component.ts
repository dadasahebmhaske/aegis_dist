import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '../customer.service';
import { MinLengthValidator } from '@angular/forms';
@Component({
  selector: 'sa-terminate-customer',
  templateUrl: './terminate-customer.component.html',
  styleUrls: ['./terminate-customer.component.css']
})
export class TerminateCustomerComponent implements OnInit {
  public cpInfo: any;
  public ConsNo: number;
  public cust: any = { RoutId: '', SubAreaId: '' };
  public custTermiData: any = {};
  public designationData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public RouteData: any = [];
  public reason: string;
  public selectedRows: any = [];
  public SubAreaArray: any = [];
  public SubAreaData: any = [];
  public terminateList: any = {};

  public actionFlag: string;
  public custData: any = {};
  public prodArray: any = [];


  constructor(private appService: AppService, private customerService: CustomerService, private masterService: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
   // this.configureGrid();
   // this.allOnLoad()
    this.custTermiData = [{}];
  }
  onGetCustomer() {
    this.loaderbtn = false;
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.customerService.getCustomer(this.cpInfo.CPCode, '', this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.custData = resData.Data[0];
        this.prodArray = null;
        this.getCustomerProductDetails();
      }
      else { this.custData = {}; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  getCustomerProductDetails() {
    this.prodArray = [{}];
    this.customerService.getProductDetails(this.cpInfo.CPCode, 'CUSTM', this.custData.ConsId).subscribe((resprod: any) => {
      if (resprod.StatusCode != 0) {
        this.prodArray = resprod.Data;
       console.log(this.prodArray);
        AppComponent.SmartAlert.Success(resprod.Message);
      }
      else { this.prodArray = []; AppComponent.SmartAlert.Errmsg(resprod.Message); }
      // for (let i = 0; i < this.prodArray.length; i++) {
      //   let docobj;
      //   //docobj = this.masterService.filterData(this.productSegmentData, this.prodArray[i].ProdSegId, 'ProdSegId');
      //   // this.prodArray[i].ProdSegName = docobj[0].ProdSeg;
      //   // docobj = this.masterService.filterData(this.productDataSelected, this.prodArray[i].ProdId, 'ProdId');
      //   // this.prodArray[i].ProdName = docobj[0].Product;    
      // }
    });
  }
onTerminate() {
    if (this.selectedRows.length > 0 && Object.keys(this.selectedRows[0]).length > 1) {
      this.loaderbtn = false;
      let forData = [];
      if (this.selectedRows != null) {
        for (let i = 0; i < this.selectedRows.length; i++) {
          forData.push({ Id: '', ConsId: this.selectedRows[i].ConsId });
        }
        this.terminateList.data = forData;
        this.selectedRows = [];
      }
      this.terminateList.CPCode = this.cpInfo.CPCode;
      this.terminateList.UserCode = this.cpInfo.EmpId;
      this.terminateList.IsActive = 'Y';
      this.terminateList.Status = 'P';
      this.customerService.postCustomeTerminate(this.terminateList).subscribe((resp: any) => {
        this.loaderbtn = true;
        if (resp.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resp.Message);
          this.custTermiData = [{}];
          this.terminateList.ReqRemark = '';
          this.cust = { RoutId: '', SubAreaId: '' };
        } else {
          AppComponent.SmartAlert.Errmsg(resp.Message);
          this.custTermiData = [{}];
        }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please select atleast one customer`);
    }


  }

  // allOnLoad() {
  //   this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR: any) => {
  //     if (resR.StatusCode != 0)
  //       this.RouteData = resR.Data;
  //   });
  //   this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA: any) => {
  //     if (reSA.StatusCode != 0) {
  //       this.SubAreaArray = reSA.Data;
  //     }
  //   });
  // }
  // configureGrid() {
  //   this.gridOptions = <IGridoption>{}
  //   this.gridOptions.exporterMenuPdf = false;
  //   this.gridOptions.exporterExcelFilename = 'Customer list.xlsx';
  //   let columnDefs = [];
  //   // this.gridOptions.multiSelect = true;
  //   // this.gridOptions.enableRowSelection = true;
  //   // this.gridOptions.enableSelectAll = true;
  //   // this.gridOptions.enableRowHeaderSelection = true;
  //   this.gridOptions.selectionRowHeaderWidth = 35;
  //   columnDefs = [
  //     // {
  //     //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Update</button> '
  //     //   , width: "63",exporterSuppressExport: true,
  //     //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Update</div>', enableFiltering: false
  //     // },
  //     { name: 'ConsId', displayName: 'ConsId', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
  //     { name: 'ConsNo', displayName: 'Customer No.', width: "*", cellTooltip: true, filterCellFiltered: true },
  //     // { name: 'Salutation', displayName: 'Salutation', width: "100", cellTooltip: true, filterCellFiltered: true },
  //     { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, filterCellFiltered: true },
  //     { name: 'LatName', displayName: 'Last Name', width: "*", cellTooltip: true, filterCellFiltered: true },
  //     { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, filterCellFiltered: true },
  //   ]
  //   this.gridOptions.columnDefs = columnDefs;
  //   //this.onLoad();
  // }
  // onEditFunction = ($event) => {
  //   //this.datashare.updateShareData($event.row);
  // }
  // onSelectFunction = ($event) => {
  //   this.selectedRows = $event.row;
  // }
  // getSubArea() {
  //   this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.cust.RoutId, 'RouteId');
  // }
  // onSubmitArea() {
  //   this.loaderbtn = false;
  //   this.cust = this.customerService.checkCustOrMobNo(this.cust);
  //   this.customerService.getCustomer(this.cpInfo.CPCode, this.cust.SubAreaId, this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
  //     this.loaderbtn = true;
  //     if (resData.StatusCode != 0) {
  //       this.custTermiData = resData.Data;
  //       AppComponent.SmartAlert.Success(resData.Message);
  //     }
  //     else {
  //       AppComponent.SmartAlert.Errmsg(resData.Message); this.custTermiData = [{}];
  //     }
  //   });
  // }
  
  
}