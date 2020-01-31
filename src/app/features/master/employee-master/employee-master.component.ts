import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {MasterService} from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent implements OnInit {
  public cpInfo:any;
  public designation:any='';
  public designationData:any=[];
  public gridOptions: IGridoption;
  public empData: any;
  constructor(private appService:AppService,private datashare:DatashareService,private masterService:MasterService) {
    
      }
      ngOnInit() {   
        this.appService.getAppData().subscribe(data => { this.cpInfo = data });
        this.configureGrid();   
        this.getDesignations();
      }
      configureGrid() {
        this.gridOptions = <IGridoption>{}
        this.gridOptions.exporterMenuPdf = false;
        this.gridOptions.exporterExcelFilename = 'Employee list.xlsx';
        let columnDefs = [];
        columnDefs = [
          {
            name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
            , width: "48",exporterSuppressExport: true,
            headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
          },
          { name: 'EmpId', displayName: 'Emp ID', width: "*", cellTooltip: true, filterCellFiltered: true,visible:false },
          { name: 'FirstName', displayName: 'First Name', width: "200", cellTooltip: true, filterCellFiltered: true },
          { name: 'LastName', displayName: 'Last Name', width: "80", cellTooltip: true, filterCellFiltered: true },
          { name: 'RoleDesc', displayName: 'Role', width: "110", cellTooltip: true, filterCellFiltered: true },
          { name: 'Salary', displayName: 'Salary', width: "130", cellTooltip: true, filterCellFiltered: true }, { name: 'Gender', displayName: 'Gender', width: "180", cellTooltip: true, filterCellFiltered: true },
          { name: 'EmailId', displayName: 'Email Id', width: "130", cellTooltip: true, filterCellFiltered: true }, { name: 'DateOfBirth', displayName: 'DateOfBirth', width: "110", cellTooltip: true, filterCellFiltered: true },
          { name: 'MobileNo', displayName: 'Mobile No.', width: "160", cellTooltip: true, filterCellFiltered: true },
          { name: 'AltrMobileNo', displayName: 'Altr Mobile No.', width: "130", cellTooltip: true, filterCellFiltered: true },
          { name: 'BloodGrp', displayName: 'Blood Group', width: "130", cellTooltip: true, filterCellFiltered: true },
          { name: 'Qualification', displayName: 'Qualification', width: "130", cellTooltip: true, filterCellFiltered: true },
          { name: 'IsActive', displayName: 'Active', width: "80", cellTooltip: true, filterCellFiltered: true },
    
        ]
        this.gridOptions.columnDefs = columnDefs;
        this.onLoad();
      }
      onEditFunction = ($event) => {
       // console.log($event.row);
    this.datashare.updateShareData($event.row);
        AppComponent.Router.navigate(['/master/employee']);
      }
      getDesignations(){
        this.masterService.getDesignation().subscribe((res:any)=>{
          if(res.StatusCode!=0)
          this.designationData=res.Data;
        });
      }
      onLoad() {
         this.masterService.getEmpoyees(this.cpInfo.CPCode,this.designation).subscribe((resData:any)=>{      
          if(resData.StatusCode!=0){
         this.empData=resData.Data;
            AppComponent.SmartAlert.Success(resData.Message);
        }
          else{AppComponent.SmartAlert.Errmsg(resData.Message); this.empData=[{}];}
        }); 
      }
    }