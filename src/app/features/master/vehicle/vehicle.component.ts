import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { VehicleService } from './vehicle.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit, OnDestroy {
  public bdata: any = [];
  public bulkDoc: any = {};
  public cpInfo: any = {};
  public docTypeData: any = [];
  public DocFileName: string;
  public document: any = { DocTypId: '' };
  public fd = new FormData();
  public filepreview: any;
  public imgUrl: string;
  public loaderbtn: boolean = true;
  public removeDocUpdate: any = [];
  public selectedFile: File = null;
  public vehicle: any = { VehicleTypeId: '' };
  public transportData: any = [];
  public datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private appService: AppService, private datashare: DatashareService, private masterService: MasterService, private vehicleService: VehicleService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.imgUrl = `${AppComponent.ImageUrl}VehicleDocs/`;
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.datashare.GetSharedData.subscribe(data => this.vehicle = data == null ? { IsActive: 'Y', VehicleTypeId: '' } : data);
    this.onLoad();
    if (this.vehicle.VehicleTypeID != '') { this.getVehicleDocumentDetails(); }
  }
  onLoad() {
    this.masterService.getTransport(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.transportData = resData.Data;
        //AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });

    this.masterService.getDocumentType('VM').subscribe(
      (resD: any) => {
        if (resD.StatusCode != 0) { this.docTypeData = resD.Data; } else { AppComponent.SmartAlert.Errmsg(resD.Message); }
      });
  }

  onFileSelected(event) {
    var reader = new FileReader();
    this.selectedFile = <File>event.target.files[0];
    this.DocFileName = event.target.files[0].name;
    //this.DocFileName = `${this.cpInfo.EmpId}_${this.DocFileName}`;
    reader.onload = (event: ProgressEvent) => {
      this.filepreview = (<FileReader>event.target).result;
      var f1 = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.'));
      f1 = f1.toString().toLowerCase();
      if (f1 == '.jpg' || f1 == '.png' || f1 == '.gif' || f1 == '.jpeg' || f1 == '.bmp' || f1 == '.txt' || f1 == '.excel' || f1 == '.xlsx' || f1 == '.pdf' || f1 == '.xps') {
      }
      else {
        $("#fileControl").val('');
        this.filepreview = 'assets/img/avatars/male.png'
        AppComponent.SmartAlert.Errmsg(`Choose only valid file `);
      }
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  onSubmitDoc() {
    let docobj;
    docobj = this.masterService.filterData(this.docTypeData, this.document.DocTypId, 'DocTypId');
    this.document.DocType = docobj[0].DocType;
    this.document.DocId = '';
    this.document.DocFileName = this.DocFileName;
    this.document.IsActive = "Y";
    this.document.filepreview = this.filepreview;
    if (this.bdata.some(obj => parseInt(obj.DocNo) === parseInt(this.document.DocNo))) {
      AppComponent.SmartAlert.Errmsg("The Document is already added in list.");
      $("#fileControl").val('');
      this.document = { DocTypId: '' };
    } else {
      this.bdata.push(this.document);
      this.fd.append(`image${this.bdata.length}`, this.selectedFile, this.DocFileName);
      $("#fileControl").val('');
      this.document = { DocTypId: '' };
    }
  }
  onRemoveDoc(data, index) {
    if (data.DocId != '' && data.DocId != null) {
      data.IsActive = 'N';
      this.removeDocUpdate.push(data);
    } else {
      this.fd.delete(`image${index}`);
    }
    this.bdata.splice(index - 1, 1)
  }
  viewDocument(base64URL) {
    var win = window.open();
    win.document.write(`<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  }
  getVehicleDocumentDetails() {
    this.masterService.getDocumentDetails('VM', this.vehicle.VehicleId).subscribe((response: any) => {
      if (response.StatusCode != 0)
        if (response.Data.length > 0) { this.bdata = response.Data; }
    });
  }
  saveDocument() {
    if (this.bdata.length > 0 || this.removeDocUpdate.length > 0) {
      this.bulkDoc.flag = this.vehicle.DocId == null ? 'IN' : 'UP';
      this.bulkDoc.RefId = this.vehicle.VehicleId;
      this.bulkDoc.FormFlag = 'VM';
      this.bulkDoc.UserCode = this.cpInfo.EmpId;
      if (this.removeDocUpdate.length > 0) {
        this.bdata = this.bdata.concat(this.removeDocUpdate);
      }
      this.bulkDoc.bdata = this.bdata;
      let ciphertext = this.appService.getEncrypted(this.bulkDoc);
      this.fd.append('CipherText', ciphertext);
      this.masterService.postBulkDoc(this.fd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.bdata = []; this.removeDocUpdate = [];
          // if(resData.Data.length!=0)
          // this.vehicle.DocId = resData.Data[0].DocId;
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/master/vehicle-master']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.Router.navigate(['/master/vehicle-master']);
      // AppComponent.SmartAlert.Errmsg(`Please Add atleast one document.`);
    }

  }
  public onSubmit() {
    this.loaderbtn = false;
    this.vehicle.Flag = this.vehicle.VehicleId == null || this.vehicle.VehicleId == '' ? 'IN' : 'UP';
    this.vehicle.CPCode = this.cpInfo.CPCode;
    this.vehicle.UserCode = this.cpInfo.EmpId;
    this.vehicle.VehicleId = this.vehicle.VehicleId == null ? '' : this.vehicle.VehicleId;
    let ciphertext = this.appService.getEncrypted(this.vehicle);
    this.vehicleService.postVehicle(ciphertext).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        if (resp.Data.length != 0)
          this.vehicle.VehicleId = resp.Data[0].VehicleId;
        this.saveDocument();
        AppComponent.SmartAlert.Success(resp.Message);
        //AppComponent.Router.navigate(['/master/vehicle-master']);
      } else {
        AppComponent.SmartAlert.Errmsg(resp.Message);
        this.loaderbtn = true;
      }
    });
  }

  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
