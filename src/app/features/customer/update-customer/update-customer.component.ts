import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition,  animate} from '@angular/animations';
import { AppService } from '@app/core/custom-services/app.service';
import { CustomerService } from '../customer.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { AppComponent } from '@app/app.component';
@Component({
  selector: 'sa-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
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
export class UpdateCustomerComponent implements OnInit {

  public addArray: any = [];
  public bulkAdd: any = {};
  public customer: any = {};
  public CustTypeData: any = [];
  public ConsumptionData: any = [];
  public ContractData:any=[];
  public CityData:any=[];
  public cpInfo: any;
  public FirmData:any=[];
  public loaderbtn: boolean = true;
  public RouteData:any=[];
  public ServiceData:any=[];
  public StateData:any=[];
  public SubAreaData:any=[];
  public SubAreaArray:any=[];
  public VolumeData: any = [];
  constructor(private appService: AppService, private customerService: CustomerService,private datashare: DatashareService, private masterService: MasterService) {
  }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.customer = data == null ? { Salutation: '', CustTypeId: '', VolumeTypeId: '', ConsuptionTypeId: '', ServiceTypeId: '',FirmTypeId:'',ContractualId:'',RoutId:'',SubAreaId:'',CustCatId:'',StateCode:'',CityCode:'' } : data);
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.allOnloadMethods();
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
      title: 'Customer Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step2',
      title: 'Customer Address Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step3',
      title: 'Customer Product Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step4',
      title: 'Customer Document Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step5',
      title: 'Customer Bank Details',
      valid: true,
      checked: false,
      submitted: false,
    },
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
      this.loaderbtn = false;
      this.customer.Flag = 'UP';
      this.customer.CPCode = this.cpInfo.CPCode;
      this.customer.UserCode = this.cpInfo.EmpId;
      this.customer.ConsId = '';
      let ciphertext = this.appService.getEncrypted(this.customer);
      this.customerService.postCustomerDetails(ciphertext).subscribe((resp: any) => {
        this.loaderbtn = true;
        if (resp.StatusCode != 0) {
          if (resp.Data.length != 0)
            this.customer.ConsId = resp.Data[0].ConsId;
            this.nextStep();
            AppComponent.SmartAlert.Success(resp.Message);
        } else {
          AppComponent.SmartAlert.Errmsg(resp.Message);
          this.loaderbtn = true;
        }
      });
     
    }
    nextToProductDeatils(){
      this.nextStep();
    }
    nextToDocumentDetails(){
      this.nextStep();
    }
    nextToBankDetails(){
      this.nextStep();
    }
    onSubmitBankDetails(){
      this.nextStep();
    }
  
    onWizardComplete(data) {
      console.log('basic wizard complete', data)
    }
    allOnloadMethods() {
      this.customerService.getCustomerType().subscribe((respCt) => {
        if (respCt.StatusCode != 0)
          this.CustTypeData = respCt.Data;
      });
      this.customerService.getVolumeType().subscribe((respV) => {
        if (respV.StatusCode != 0)
          this.VolumeData = respV.Data;
      });
      this.customerService.getConsumptionType().subscribe((respC) => {
        if (respC.StatusCode != 0)
          this.ConsumptionData = respC.Data;
      });
      this.customerService.getServiceType().subscribe((respS) => {
        if (respS.StatusCode != 0)
          this.ServiceData = respS.Data;
      });
      this.customerService.getFirmType().subscribe((respF) => {
        if (respF.StatusCode != 0)
          this.FirmData = respF.Data;
      });
      this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR:any)=>{      
        if(resR.StatusCode!=0)
       this.RouteData=resR.Data;  
      }); 
      this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA:any)=>{      
        if(reSA.StatusCode!=0){
       this.SubAreaArray=reSA.Data;
      }     
      }); 
      this.masterService.getState().subscribe((resSt: any) => {
          if(resSt.StatusCode!=0)
          this.StateData = resSt.Data;
        });
        this.customerService.getContraType().subscribe((resCo) => {
          if (resCo.StatusCode != 0)
            {this.ContractData = resCo.Data;
            this.getSubArea();}
        });
    }
    getSubArea(){
      this.SubAreaData= this.masterService.filterData( this.SubAreaArray,this.customer.RoutId,'RouteId');
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

}
