import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../../settings/setting.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-sf-sd-bulk-price-allocation',
  templateUrl: './sf-sd-bulk-price-allocation.component.html',
  styleUrls: ['./sf-sd-bulk-price-allocation.component.css']
})
export class SfSdBulkPriceAllocationComponent implements OnInit {
  public actionData: any;
  public cpInfo: any;
  public chantype:any=[];
  public CPCode:any='';
  public gridOptions: IGridoption;
  public gridhide: boolean;
  public loaderbtn: boolean = true;
  public file: File;
  public headerNames: any = {};
  public fileUrl;
  public bulkPrice: any = {};
  constructor(private appService: AppService, private settingService: SettingService,private masterService:MasterService, private httpClient: HttpClient) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.onloadAll();
  }
  onloadAll(){
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
    this.chantype = resCP.Data;
  //this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName });
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{};
    this.gridOptions.enableGridMenu = false;
    this.gridOptions.exporterMenuPdf = false;
    // this.gridOptions.exporterExcelFilename = 'Customer_List_Details.xlsx';
    // this.gridOptions.exporterSuppressColumns = ["Channel Partner Code", 'Plant ID', 'Product Segment ID', 'Product ID', 'Price Code'];
    // this.gridOptions.exporterColumnScaleFactor = 5;
    let columnDefs = [];
    let hideHeader = ['Channel Partner Code', 'Plant ID', 'Product Segment ID', 'Product ID', 'Price Code']
    this.headerNames.forEach(function (h) {
      columnDefs.push({ field: h, width: '200' });
      // columnDefs.push({ width: '150' });
    });

    columnDefs.forEach(function (a) {
      for (let i = 0; i < hideHeader.length; i++) {
        if (hideHeader[i] == a.field) {
          a.visible = false;
        }
      }
    });
    this.gridhide = true;
    this.gridOptions.columnDefs = columnDefs;


  }
  onEditFunction = ($event) => {
    // this.dataShare.updateShareData($event.row);
    // AppComponent.Router.navigate(['/settings/sf-sd-price-allocation']);
  }
  downloadFile(data: any, type: string) {
    const blob = new Blob([data], { type: type });
    this.fileUrl = window.URL.createObjectURL(blob);
    window.open(this.fileUrl);
  }

  getTemplate() {
    // this.bulkPrice.CPCode == null || this.bulkPrice.CPCode == undefined ? '' : this.bulkPrice.CPCode;
    // this.bulkPrice.PlantId == null || this.bulkPrice.PlantId == undefined ? '' : this.bulkPrice.PlantId;
    //     this.settingService.getTemplate(this.cpInfo.CPCode).subscribe((resData: any) => {
    //   this.loaderbtn = true;
    //   saveAs(resData,'Template.xlsx');
    //   if (resData.StatusCode != 0) {
    //   }
    // });
    this.loaderbtn = false;
    this.httpClient.get(AppComponent.BaseUrl + `Master/GetPriceAllocTemplate?CPCode=${this.CPCode}&PlantId=`,
      { headers: AppComponent.headers, responseType: 'blob' }).subscribe(response => {
        this.loaderbtn = true;
        saveAs(response, 'Template.xlsx');
      });
  }

  onFileChange(ev) {
    this.file = ev.target.files[0];
    this.gridhide = false;
    // this.loading=false;       
  }

  OnImport() {
    this.loaderbtn = false;
    let workBook = null;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      // workBook = XLSX.read(data, { type: 'binary' });
      // this.jsonData = workBook.SheetNames.reduce((initial, name) => {
      //   const sheet = workBook.Sheets[name];
      //   initial["data"] = XLSX.utils.sheet_to_json(sheet);
      //   return initial;
      // }, {});
      // this.actionData = JSON.stringify(this.jsonData);

      workBook = XLSX.read(data, { type: 'binary', cellDates: true });
      this.headerNames = XLSX.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], { header: 1 })[0];
      // XLSX.utils.format_cell( workBook.Sheets[workBook.SheetNames[0]].B, {dateNF:'YYYY"-"MM"-"DD'});
      this.actionData = XLSX.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], { raw: false, dateNF: 'dd"-"mmm"-"yyyy' });
      // this.actionData = this.jsonData;
      // this.dataString = JSON.stringify({'data':this.jsonData});

      this.configureGrid();
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(this.file);
    this.loaderbtn = true;
  }

  onSubmit() {
    this.loaderbtn = false;
    let arr = [];
    for (var j = 0; j < this.actionData.length; j++) {
      arr.push({
        "ProdSegId": this.actionData[j]["Product Segment ID"],
        "ProdId": this.actionData[j]["Product ID"],
        "Price": this.actionData[j].Price,
        "PriceCode": this.actionData[j]["Price Code"],
        "EffectiveFromDate": this.actionData[j]["Effective From Date"],
        "EffectiveToDate": this.actionData[j]["Effective To Date"],
        "MRPrice": this.actionData[j].MRP,
        "TtlPrice": this.actionData[j]["Total Price"],
        "CPCode": this.actionData[j]["Channel Partner Code"],
        "PlantId": this.actionData[j]["Plant ID"],
        "IsActive": "Y",
      });
    }

    this.bulkPrice.data = arr;
    this.bulkPrice.Flag = 'IN';
    this.bulkPrice.UserCode = this.cpInfo.EmpId;
    this.settingService.postBulkPriceAllocation(this.bulkPrice).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        this.bulkPrice = {};
        this.actionData = [];
        AppComponent.Router.navigate(['/settings/sf-sd-price-allocation-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });

    // this.http.post(AppComponent.BaseUrl +'Master/UploadProdPriceAllocation', this.sample,{headers:AppComponent.headers}).subscribe((res:Config)=>{
    //   this.loading = false;
    //   if (res.StatusCode != 0){
    //     AppComponent.SmartAlert.Success(res.Message);
    //     this.bulkPrice = {RegionId: '',  StateCode: '', CityCode: '', ChannelId: '', CPCode: '', PlantId:''};
    //     this.actionData = {};
    //     this.headerNames = {};
    //     this.gridhide = false;
    //   } else {
    //     AppComponent.SmartAlert.Errmsg(res.Message);
    //   }
    //});
  }

}
