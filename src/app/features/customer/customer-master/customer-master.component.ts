import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
@Component({
  selector: 'sa-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  public cpInfo: any;
  public ConsNo: number;
  public custData: any = {};
  public custDataStored: any = [];
  public designationData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  constructor(private appService: AppService, private datashare: DatashareService, private masterService: MasterService) {

  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer list.xlsx';

    // this.gridOptions.multiSelect = false;
    // this.gridOptions.enableRowSelection = false;
    // this.gridOptions.enableSelectAll = false;
    // this.gridOptions.enableRowHeaderSelection = false;
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Update</button> '
        , width: "63", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Update</div>', enableFiltering: false
      },
      { name: 'ConsId', displayName: 'ConsId', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'ConsNo', displayName: 'Customer No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'Salutation', displayName: 'Salutation', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'FirstName', displayName: 'First Name', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'LatName', displayName: 'Last Name', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "140", cellTooltip: true, filterCellFiltered: true },
      { name: 'AltrMobileNo', displayName: 'Altr Mobile No.', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmailId', displayName: 'Email Id', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'OpeningCylQty', displayName: 'Opening Cyl. Qty', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'OpeningBalAmt', displayName: 'Opening Bal Amt', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'CustTypeName', displayName: 'Customer Type', width: "140", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsuptionTypeName', displayName: 'Consumption Type', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'VolumeTypeName', displayName: 'Volume Type', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ServiceTypeName', displayName: 'Service Type', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'FirmTypeName', displayName: 'Firm Type', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'ContractualName', displayName: 'Contractual  Non-Contractual', width: "225", cellTooltip: true, filterCellFiltered: true },
      { name: 'RouteName', displayName: 'Rout', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'InchargeName', displayName: 'Incharge Name', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'InchargeMobileNo', displayName: 'Incharge Mob. No.', width: "155", cellTooltip: true, filterCellFiltered: true },
      { name: 'GstNo', displayName: 'GST No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ManifoldCertNo', displayName: 'Manifold Cert. No.', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', width: "90", cellTooltip: true, filterCellFiltered: true },
      // { name: 'CustTypeId', displayName: 'Customer Type', width: "140", cellTooltip: true, filterCellFiltered: true ,visible:false},
      // { name: 'ConsuptionTypeId', displayName: 'Consumption Type', width: "160", cellTooltip: true, filterCellFiltered: true ,visible:false},
      // { name: 'VolumeTypeId', displayName: 'Volume Type', width: "130", cellTooltip: true, filterCellFiltered: true ,visible:false},
      // { name: 'ServiceTypeId', displayName: 'Service Type', width: "120", cellTooltip: true, filterCellFiltered: true ,visible:false},
      // { name: 'FirmTypeId', displayName: 'Firm Type', width: "120", cellTooltip: true, filterCellFiltered: true,visible:false },
      // { name: 'ContractualId', displayName: 'Contractual  Non-Contractual', width: "120", cellTooltip: true, filterCellFiltered: true ,visible:false},
      // { name: 'RoutId', displayName: 'Rout', width: "120", cellTooltip: true, filterCellFiltered: true,visible:false },
      // { name: 'SubAreaId', displayName: 'Sub Area', width: "130", cellTooltip: true, filterCellFiltered: true,visible:false },

    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/customer/update-customer']);
  }

  onLoad() {
    this.masterService.getCustomer(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.custData = resData.Data;
        this.custDataStored = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.custData = [{}]; }
    });
  }
  getCustomer() {
    this.custData = this.masterService.filterData(this.custDataStored, this.ConsNo, 'ConsNo');
    if (this.custData.length == 0)
      this.custData = [{}]; AppComponent.SmartAlert.Errmsg('No Records Found');
  }
}