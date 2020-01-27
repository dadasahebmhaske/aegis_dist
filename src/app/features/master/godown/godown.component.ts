
import { Component, OnInit,OnDestroy } from '@angular/core';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {AppComponent} from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { trigger, state, style, transition,  animate} from '@angular/animations';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { GodownService } from '@app/features/master/godown/godown.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'sa-godown',
  templateUrl: './godown.component.html',
  styleUrls: ['./godown.component.css'],
  animations: [
    trigger('changePane', [
      state('out', style({
        height: 0,
      })),
      state('in', style({
        height: '*',
      })),
      transition('out => in', animate('250ms ease-out')),
      transition('in => out', animate('250ms 300ms ease-in'))
    ])
  ]
})
export class GodownComponent implements OnInit {

  private bsValue = new Date();
  public bdata:any=[];
  public CityData:any=[];
  private cpInfo:any;
  public  docTypeData: any=[];
  public DocFileName:string;
  public document:any={};
  public fd = new FormData();
  private godown:any={StateCode:'',DocTypId:''};
  public StateData:any=[];
  public selectedFile: File = null;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private httpClient:HttpClient,private appService:AppService,private datashare:DatashareService,private godownService:GodownService, private masterService:MasterService) { 
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true,isAnimated: true });
  }


  ngOnInit() {    
    this.datashare.GetSharedData.subscribe(data => this.godown = data==null?{}:data);
    this.allOnloadMethods();
  
        this.appService.getAppData().subscribe(data=>{this.cpInfo=data});
  }

  public model = {
    email: '',
    firstname: '',
    lastname: '',
    country: '',
    city: '',
    postal: '',
    wphone: '',
    hphone: ''
  };

  public steps = [
    {
      key: 'step1',
      title: 'Godown Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step2',
      title: 'Address Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step3',
      title: 'Document Details',
      valid: false,
      checked: false,
      submitted: false,
    }
  ];

  public activeStep = this.steps[0];
  
    setActiveStep(steo) {
      this.activeStep = steo
    }
  
    prevStep() {
      let idx = this.steps.indexOf(this.activeStep);
      if (idx > 0) {
        this.activeStep = this.steps[idx - 1]
      }
    }
  
    nextStep() {
      this.activeStep.submitted = true;
      if(!this.activeStep.valid){
        return;
      }
      this.activeStep.checked = true;
      if (this.steps.every(it=>(it.valid && it.checked))) {
        this.onWizardComplete(this.model)
      } else {
        let idx = this.steps.indexOf(this.activeStep);
        this.activeStep = null;
        while (!this.activeStep) {
          idx = idx == this.steps.length - 1 ? 0 : idx + 1;
          if (!this.steps[idx].valid || !this.steps[idx].checked ) {
            this.activeStep = this.steps[idx]
          }
        }
      }
    }
  
  
    nextToAddress(){
      this.nextStep();
    }
    nextToDocumentDeatils(){
      this.nextStep();
    }
    nextToSave(){




      this.nextStep();
    }
    onWizardComplete(data) {
      console.log('basic wizard complete', data)
    }
    allOnloadMethods(){
      this.masterService.getState().subscribe(
        (res : any)=>{
          this.StateData = res.Data;
      });
      this.masterService.getDocumentType().subscribe(
        (resData : any)=>{
          this.docTypeData = resData.Data;
      });
    }
    onFileSelected(event) {
      var reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      this.DocFileName = event.target.files[0].name;
      reader.onload = (event: ProgressEvent) => {
       // this.filepreview = (<FileReader>event.target).result;
        var f1 = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.'));
        f1 = f1.toString().toLowerCase();
        let docobj;
        docobj=this.godownService.filterData(this.docTypeData,this.document.DocTypId);
      if(`.${docobj[0].DocType}`==f1){}
        // if (f1 == '.jpg' || f1 == '.png' || f1 == '.gif' || f1 == '.jpeg' || f1 == '.bmp') {
        
        // }
        else {
          $("#fileControl").val('');
          //this.filepreview = 'assets/img/avatars/Product.png';
          AppComponent.SmartAlert.Errmsg(`Choose only .${docobj[0].DocType} file `);
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    onSubmitDoc(){
      this.document.DocId='';
      this.document.DocFileName=this.DocFileName;
      this.bdata.push(this.document);
      this.fd.append(`image${this.bdata.length}`, this.selectedFile, this.DocFileName);
    }
   getCityData(){
    this.masterService.getCity(this.godown.StateCode).subscribe((res)=>{
     if(res.StatusCode!=0){ this.CityData=res.Data;}else{ this.CityData=[];}
    });
   }
    private onSubmit(){
      this.godown.Flag=this.godown.RouteId==null?'IN':'UP';
      this.godown.IsActive = this.godown.IsActive == false ? 'N' : 'Y';
      this.godownService.postGodown(this.godown).subscribe(resData=>{
        if(resData.StatusCode!=0){
          AppComponent.SmartAlert.Success(resData.Message);
        //  AppComponent.Router.navigate(['/master/bank-grid']);
      }
        else{AppComponent.SmartAlert.Errmsg(resData.Message);}
      }); 
    }
  
    private lastModel;
  
    //custom change detection
    ngDoCheck() {
      if (!this.lastModel) {
        // backup model to compare further with
        this.lastModel = Object.assign({}, this.model)
      } else {
        if (Object.keys(this.model).some(it=>this.model[it] != this.lastModel[it])) {
          // change detected
          this.steps.find(it=>it.key == 'step1').valid = !!(this.model.email && this.model.firstname && this.model.lastname);
          this.steps.find(it=>it.key == 'step2').valid = !!(this.model.country && this.model.city && this.model.postal);
          this.lastModel = Object.assign({}, this.model)
        }
      }
    }
    ngOnDestroy(){
      this.datashare.updateShareData(null);    
    }
}
