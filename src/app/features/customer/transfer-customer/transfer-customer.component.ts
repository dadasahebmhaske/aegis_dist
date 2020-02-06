import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {MasterService} from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'sa-transfer-customer',
  templateUrl: './transfer-customer.component.html',
  styleUrls: ['./transfer-customer.component.css']
})
export class TransferCustomerComponent implements OnInit {
  public cpInfo:any;
  public ConsNo:number;
  public custOutData: any={};
  public custDataStored:any=[];
  public designationData:any=[];
  public gridOptions: IGridoption;
  public loaderbtn:boolean=true;
  constructor(private appService:AppService,private datashare:DatashareService,private masterService:MasterService) {
    
  }
  ngOnInit() {   
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();   
    this.custOutData=[{}];
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer list.xlsx';
    let columnDefs = [];
    columnDefs = [
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Update</button> '
      //   , width: "63",exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Update</div>', enableFiltering: false
      // },
      { name: 'ConsId', displayName: 'ConsId', width: "*", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'ConsNo', displayName: 'Customer No.', width: "*", cellTooltip: true, filterCellFiltered: true },
     // { name: 'Salutation', displayName: 'Salutation', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'LatName', displayName: 'Last Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, filterCellFiltered: true },
    
    ]
    this.gridOptions.columnDefs = columnDefs;
    //this.onLoad();
  }
  onEditFunction = ($event) => {
    console.log($event.row);
//this.datashare.updateShareData($event.row);
    
  }

  onSubmitArea() {
  //    this.masterService.getCustomer(this.cpInfo.CPCode).subscribe((resData:any)=>{      
  //     if(resData.StatusCode!=0){
  //    this.custData=resData.Data;
  //    this.custDataStored=resData.Data;
  //       AppComponent.SmartAlert.Success(resData.Message);
  //   }
  //     else{AppComponent.SmartAlert.Errmsg(resData.Message); this.custData=[{}];}
  //   }); 
  }
 
}