import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
@Component({
  selector: 'sa-transport-master',
  templateUrl: './transport-master.component.html',
  styleUrls: ['./transport-master.component.css']
})
export class TransportMasterComponent implements OnInit {
  public gridOptions: IGridoption;
  public transportData: any;
  constructor(public datashare: DatashareService, public masters: MasterService) {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Transport Master list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'TransportID', displayName: 'Transport ID', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'TransportName', displayName: 'Transport', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/transport']);
  }
  onLoad() {
    this.transportData = this.masters.getTransport();
    // this.masters.getTransport().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
    // this.transportData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}
