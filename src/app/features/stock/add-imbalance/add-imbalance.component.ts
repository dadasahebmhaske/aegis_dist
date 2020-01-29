import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-add-imbalance',
  templateUrl: './add-imbalance.component.html',
  styleUrls: ['./add-imbalance.component.css']
})
export class AddImbalanceComponent implements OnInit {
  public gridOptions: IGridoption;
  public imbalanceData: any = [];
  constructor() {
  }
  ngOnInit() {
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

      { name: 'ProductSegment', displayName: 'Product Segment', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'ProductName', displayName: 'Product ', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'SoundQtyPlus', displayName: 'Sound (+) Qty', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'SoundQtyMinus', displayName: 'Sound (-) Qty', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmptyQtyPlus', displayName: 'Empty (+) Qty ', width: "125", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmptyQtyMinus', displayName: 'Empty (-) Qty ', width: "120", cellTooltip: true, filterCellFiltered: true },

      { name: 'DeffectiveQtyPlus', displayName: 'Defective (+) Qty', width: "135", cellTooltip: true, filterCellFiltered: true },
      { name: 'DeffectiveQtyMinus', displayName: 'Defective (-) Qty', width: "135", cellTooltip: true, filterCellFiltered: true },
      { name: 'Date', displayName: 'Date', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'ImbalanceStatus', displayName: 'Status', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'ImbalanceRefNo', displayName: 'Imbalance Ref No.', width: "145", cellTooltip: true, filterCellFiltered: true },
      { name: 'Remark', displayName: 'Remark', width: "290", cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    AppComponent.Router.navigate(['/stock/imbalance']);
  }
  onLoad() {
    this.imbalanceData = [{
      'ProductSegment': 'Product Segment 1',
      'ProductName': 'Comm. Cylinder 19 KG',
      'SoundQtyPlus': 500,
      'SoundQtyMinus': 0,
      'EmptyQtyPlus': 1,
      'EmptyQtyMinus': 0,
      'DeffectiveQtyPlus': 2,
      'DeffectiveQtyMinus': 0,
      'Date': '10-01-2020',
      'ImbalanceStatus': 'Not Approved',
      'Remark': 'Please revert as soon as possible',
      'ImbalanceRefNo': 'IMREF0123456',
    }];
    // this.masters.getVehicles().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
    // this.vehicleData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}