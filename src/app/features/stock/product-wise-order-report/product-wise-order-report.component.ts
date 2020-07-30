import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-product-wise-order-report',
  templateUrl: './product-wise-order-report.component.html',
  styleUrls: ['./product-wise-order-report.component.css']
})
export class ProductWiseOrderReportComponent implements OnInit {
    public cpInfo: any = {};
    public CPCode: any = '';
    public chantype: any = [];
    public datePickerConfig: Partial<BsDatepickerConfig>;
    public EndDate: any = '';
    public loaderbtn: boolean = true;
    public minDate: Date;
    public maxDate: Date = new Date();
    public gridOptions: IGridoption;
    public StartDate: any = '';
    public ProdOrderData: any = [];
    constructor(private appService: AppService, public datashare: DatashareService, public stockService: StockService,private masterService:MasterService) {
      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
    }
    ngOnInit() {
      this.appService.getAppData().subscribe(data => { this.cpInfo = data; this.CPCode=this.cpInfo.CPCode; });
      this.StartDate = this.EndDate = new Date();
      this.allOnLoad();
      this.configureGrid();
    }
    allOnLoad() {
      this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
        if (resCP.StatusCode != 0)
          this.chantype = resCP.Data; 
        this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName,SAPId:this.cpInfo.SAPId,Address:this.cpInfo.Address });
      });
    }
    configureGrid() {
      this.gridOptions = <IGridoption>{}
      this.gridOptions.exporterMenuPdf = false;
      this.gridOptions.exporterExcelFilename = 'Product Wise Order Report.xlsx';
      let columnDefs = [];
      columnDefs = [
        // {
        //   name: 'Select1', displayName: 'Edit', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs"  ng-if="row.entity.Status=='PE" ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> `
        //   , width: "48", exporterSuppressExport: true,
        //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
        // },
 
      { name: 'Date', displayName: 'Date', cellClass: 'cell-center', width: '130', cellTooltip: true, filterCellFiltered: true },
      { name: 'State', displayName: 'State', width: '170', cellTooltip: true, filterCellFiltered: true },
      { name: 'Plant', displayName: 'Plant', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'Channel', displayName: 'Channel', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'CPName', displayName: 'CP Name', width: '250', cellTooltip: true, filterCellFiltered: true },
      { name: 'SegmentProduct', displayName: 'Product Segment', width: '200', cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product', width: '200', cellTooltip: true, filterCellFiltered: true },      
      { name: 'VolmNos', displayName: 'Volume(Nos)', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'VolmKgs', displayName: 'Volume(Kgs)', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'ValueBasic', displayName: 'Value(Basic)', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'ValueGST', displayName: 'Value(GST)', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'TotValueRs', displayName: 'Total Value', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'Designation', displayName: 'Designation', width: '200', cellTooltip: true, filterCellFiltered: true },
      { name: 'EmployeeName', displayName: 'Executive Name', width: '250', cellTooltip: true, filterCellFiltered: true },
      { name: 'City', displayName: 'City', width: '170', cellTooltip: true, filterCellFiltered: true },
      { name: 'Region', displayName: 'Region', width: '150', cellTooltip: true, filterCellFiltered: true },
      ]
      this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    // onEditFunction = ($event) => {
    //   console.log($event.row);
    //   this.datashare.updateShareData($event.row);
    //   AppComponent.Router.navigate(['/stock/imbalance']);
    // }
    onLoad() {
      this.loaderbtn = false;
          let ParentCPCode = this.cpInfo.ParentCPCode == null ? this.cpInfo.CPCode : this.cpInfo.ParentCPCode;
      this.stockService.getProductorderWiseOrderDetails(ParentCPCode,this.CPCode, this.appService.DateToString(this.StartDate), this.appService.DateToString(this.EndDate),this.cpInfo.EmpId).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.ProdOrderData = resData.Data; console.log(resData.Data);
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); this.ProdOrderData = [{}] }
  
      });
    }
    resetEndDate(val) {
      this.minDate = val;
      if (val != undefined && val != null && this.EndDate != null) {
        if ((new Date(this.EndDate).getTime()) < (new Date(val).getTime())) {
          this.EndDate = '';
        }
      }
  
    }
  
  }