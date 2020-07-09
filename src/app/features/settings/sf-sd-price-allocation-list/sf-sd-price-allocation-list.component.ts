import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { SettingService } from '../../settings/setting.service';
import { CustomerService } from '@app/features/customer/customer.service';

@Component({
  selector: 'sa-sf-sd-price-allocation-list',
  templateUrl: './sf-sd-price-allocation-list.component.html',
  styleUrls: ['./sf-sd-price-allocation-list.component.css']
})
export class SfSdPriceAllocationListComponent implements OnInit {
  public cpInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  public PAllocation: any = { ProdSegId: '', ProdId: '' };
  public PriceAllocationData: any = [];
  public productSegmentData: any = [];
  public productDataSelected: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private dataShare: DatashareService, private masterService: MasterService, private stockService: StockService, private settingService: SettingService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.onloadAll();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'SF / SD /POS Price Allocation list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Edit', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.CPCode!='' && row.entity.CPCode!=undefined"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> `
        , width: "50", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'CPCode', displayName: 'CP Code',cellClass: 'cell-center', width: '120', cellTooltip: true, filterCellFiltered: true, },
      { name: 'CPName', displayName: 'SF / SD / POS Name', width: '250', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdSeg', displayName: 'Product segment', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product ', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'Price', displayName: 'Price',cellClass: 'cell-right', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'MRPrice', displayName: 'RSP',cellClass: 'cell-right', width: '120', cellTooltip: true, filterCellFiltered: true },
      { name: 'EffectiveFromDate', displayName: 'From Date',cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'EffectiveToDate', displayName: 'To Date',cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Is Active',cellClass: 'cell-center', width: "110", cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
    this.dataShare.updateShareData($event.row);
    AppComponent.Router.navigate(['/settings/sf-sd-price-allocation']);
  }
  onloadAll() {
    this.masterService.getProductSegmentDetails(this.cpInfo.ChannelId).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data;
    });
  }
  onSelectProdSegment() {
    this.masterService.getProducts(this.PAllocation.ProdSegId,'F').subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.productDataSelected = resPT.Data;
      } else { this.productDataSelected = []; }
    });
  }
  onLoad() {
    this.loaderbtn = false;
    this.PAllocation.CPCode = this.PAllocation.CPCode == null || this.PAllocation.CPCode == undefined ? '' : this.PAllocation.CPCode;
    this.settingService.getSFSDPriceAllocationDetails(this.cpInfo.CPCode,this.PAllocation.CPCode, this.PAllocation.ProdSegId, this.PAllocation.ProdId).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.PriceAllocationData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.PriceAllocationData = [{}] }
    });
  }
}
