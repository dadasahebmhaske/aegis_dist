import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption'
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { SettingService } from '../../settings/setting.service';

@Component({
  selector: 'sa-category-wise-discount-allocation-list',
  templateUrl: './category-wise-discount-allocation-list.component.html',
  styleUrls: ['./category-wise-discount-allocation-list.component.css']
})
export class CategoryWiseDiscountAllocationListComponent implements OnInit {
  public bookOrder: any = { StartDate: '', EndDate: '', RoutId: '', SubAreaId: '' };
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public DiscountData: any = {};
  public gridOptions: IGridoption;
  public minDate: Date;
  public maxDate: Date = new Date();
  constructor(private appService: AppService, private datashare: DatashareService, private masterService: MasterService, private stockService: StockService, private orderService: OrderService, private settingService: SettingService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Category Wise Discount Allocation list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.IsActive=='Y'"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> `
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'Category', displayName: 'Category', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'DiscountPer', displayName: 'Discount Percentage',cellClass: 'cell-right', width: "*", cellTooltip: true, filterCellFiltered: true },
      //{ name: 'SubAreaId', displayName: 'Sub Area Id', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'IsActive', displayName: 'Is Active',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/settings/category-wise-discount-allocation']);
  }
  onLoad() {
    this.masterService.getDiscountDetails(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.DiscountData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.DiscountData = [{}] }
    });
  }

}
