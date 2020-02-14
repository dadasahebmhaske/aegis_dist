import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-add-imbalance',
  templateUrl: './add-imbalance.component.html',
  styleUrls: ['./add-imbalance.component.css']
})
export class AddImbalanceComponent implements OnInit {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public EndDate: any = '';
  public minDate: Date;
  public gridOptions: IGridoption;
  public StartDate: any = '';
  public imbalanceData: any = [];
  constructor(private appService: AppService, public datashare: DatashareService, public stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Delivered Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Edit', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> '
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'ProdSeg', displayName: 'Product Segment', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product ', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'ReferenceNo', displayName: 'Imbalance Ref No.', width: "145", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'ImbalanceDate', displayName: 'Imbalance Date ', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'SoundPlus', displayName: 'Sound (+) Qty', width: "128", cellTooltip: true, filterCellFiltered: true },
      { name: 'SoundMinus', displayName: 'Sound (-) Qty', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmptyPlus', displayName: 'Empty (+) Qty ', width: "125", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmptyMinus', displayName: 'Empty (-) Qty ', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'DefPlus', displayName: 'Defective (+) Qty', width: "145", cellTooltip: true, filterCellFiltered: true },
      { name: 'DefMinus', displayName: 'Defective (-) Qty', width: "145", cellTooltip: true, filterCellFiltered: true },
      { name: 'Status', displayName: 'Status', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'Remark', displayName: 'Remark', width: "290", cellTooltip: true, filterCellFiltered: true }
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/stock/imbalance']);
  }
  onLoad() {
    this.stockService.getStockImbalanceDetails(this.cpInfo.CPCode, this.StartDate, this.EndDate).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.imbalanceData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

}