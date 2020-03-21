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
  selector: 'sa-price-allocation-list',
  templateUrl: './price-allocation-list.component.html',
  styleUrls: ['./price-allocation-list.component.css']
})
export class PriceAllocationListComponent implements OnInit {

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
    this.gridOptions.exporterExcelFilename = 'Refill Booking Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Edit', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.IsActive=='Y'"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> `
        , width: "50", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'Prodseg', displayName: 'Product segment', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product ', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'Price', displayName: 'Price', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'EffectiveDate', displayName: 'Effective Date', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Is Active', width: "110", cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
    this.dataShare.updateShareData($event.row);
    AppComponent.Router.navigate(['/settings/price-allocation']);
  }
  onloadAll() {
    this.masterService.getProductSegmentDetails().subscribe((resR: any) => {
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
    this.settingService.getPriceAllocationDetails(this.cpInfo.CPCode, this.PAllocation.ProdSegId, this.PAllocation.ProdId).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.PriceAllocationData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.PriceAllocationData = [{}] }
    });
  }
}
