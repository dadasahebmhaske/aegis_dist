import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';

import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-route-mapping',
  templateUrl: './route-mapping.component.html',
  styleUrls: ['./route-mapping.component.css']
})
export class RouteMappingComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  public chantype: any = [];
  public allocData: any;
  //public CityData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public route: any = [];
  public routeMapping: any = { StateCode: '', CityCode: '' };
  // public StateData: any = [];
  public setd: boolean = true;
  arr1: any = [];
  arr2: any = [];
  i = 0;
  constructor(public appService: AppService, public datashare: DatashareService, public masterService: MasterService) { }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data; this.routeMapping.CPCode = this.cpInfo.CPCode; });
    this.datashare.GetSharedData.subscribe(data => data == null ? (this.routeMapping = { IsActive: 'Y', CPCode: this.cpInfo.CPCode }, this.getAreaAllocated(0)) : (this.routeMapping = data, this.getAreaAllocated(1)));
    this.allOnload();
  }
  public allOnload() {
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
      this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName });
    });
    // this.masterService.getState().subscribe(
    //   (res: any) => {
    //     this.StateData = res.Data;
    //     this.getCityData();
    //   });
  }
  getAreaAllocated(p) {
    let RouteId=p==0?'':this.routeMapping.RouteId;
    this.masterService.getAreaAllocated(this.routeMapping.CPCode,RouteId).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.arr2 = resData.Data; 
        this.allocData = this.arr2.map(v => ({ ...v, boxclick: false }));
        if (p == 1) {
          this.allocData.forEach(item => {
            item.boxclick = item.IsCheck == 1 ? true : false;
          });
        }
        this.configureGrid();
      } else { this.allocData = [{}]; }

    });
  }
  // getCityData() {
  //   this.masterService.getCity(this.routeMapping.StateCode).subscribe((res) => {
  //     if (res.StatusCode != 0) { this.CityData = res.Data; } else { this.CityData = []; }
  //   });
  // }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Route_Mapping_Details.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Edit', displayName: 'Edit', cellTemplate: '<input type="checkbox" style="margin-left: 25px;" ng-if="row.entity.AreaName!=null" ng-model="row.entity.boxclick" ng-click="grid.appScope.check($event,row.entity)"/> '
        , width: '60', headerCellTemplate: '<div style="text-align: center;margin-top: 22px;">Select</div>', enableFiltering: false
      },

      { name: 'AreaName', displayName: 'Area', width: '*', cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area', width: '*', cellTooltip: true, filterCellFiltered: true },
    ];
    this.gridOptions.columnDefs = columnDefs;

  }
  onCheckData = (sample) => {
    this.i = this.arr1.length;
    delete sample.row['$$hashKey'];
    if (sample.event.target.checked) {
      this.arr1[this.i] = sample.row;
      // this.i++;
    } else {
      this.arr1 = this.arr1.filter(val => val.UniqueId != sample.row.UniqueId);
    }
  }
  public onSubmit() {
    this.loaderbtn = false;
    let arrayMenu = []; let CheckSelected = false;
    for (let j = 0; j < this.allocData.length; j++) {
      if (this.allocData[j].boxclick == true) { CheckSelected = true; }
      arrayMenu.push({
        "AreaId": this.allocData[j].AreaCode,
        "SubAreaId": this.allocData[j].SubAreaId,
        "IsCheck": this.allocData[j].boxclick == true ? 1 : 0,
      });
    }
    this.routeMapping.Flag = this.routeMapping.RouteId == null ? 'IN' : 'UP';
    //this.routeMapping.CPCode = this.cpInfo.CPCode;
    this.routeMapping.UserCode = this.cpInfo.EmpId;
    this.routeMapping.RouteId = this.routeMapping.RouteId == null ? '' : this.routeMapping.RouteId;
    this.routeMapping.data = arrayMenu;
    let ciphertext = this.appService.getEncrypted(this.routeMapping);
    if (CheckSelected) {
      this.masterService.postRouteMapping(ciphertext).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/master/route-mapping-master']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please select area & subarea`);
      this.loaderbtn = true;
    }

  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
