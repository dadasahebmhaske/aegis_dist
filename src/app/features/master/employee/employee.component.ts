import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition,  animate} from '@angular/animations';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { EmployeeService } from '@app/features/master/employee/employee.service';
import { AppComponent } from '@app/app.component';
@Component({
  selector: 'sa-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
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
export class EmployeeComponent implements OnInit {
 
  public cpInfo: any;
  public designationData:any=[];
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn:boolean=true;
  public employee:any={};
  constructor(private appService: AppService, private datashare: DatashareService, private employeeService: EmployeeService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.employee = data == null ? {RoleCode: '',Gender:'',MaritalStatus:'',BloodGrp:''} : data);
  
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.getDesignation();
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
      title: 'Employee Details',
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
      this.loaderbtn=false;
      this.employee.Flag=this.employee.EmpId==null || this.employee.EmpId==''?'IN':'UP';
      this.employee.EmpId=this.employee.EmpId==null?'':this.employee.EmpId;
     this.employee.DeptId=null;
      this.employee.CPCode=this.cpInfo.CPCode;
      this.employee.UserCode=this.cpInfo.EmpId;      
      let ciphertext=this.appService.getEncrypted(this.employee);
      this.employeeService.postEmployeeDetails(ciphertext).subscribe((resData:any)=>{
        this.loaderbtn=true;
        if(resData.StatusCode!=0){
          AppComponent.SmartAlert.Success(resData.Message);
          this.employee.EmpId=resData.Data[0].EmpId;
          this.nextStep();
      }
        else{AppComponent.SmartAlert.Errmsg(resData.Message);}
      }); 

      //this.nextStep();
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
   
    private lastModel;
  
    getDesignation(){
    this.masterService.getDesignation().subscribe((res)=>{
      if(res.StatusCode!=0){
        this.designationData=res.Data;    
      }
    });
    }
    checkingPassword(){
      if(this.employee.Password!=this.employee.ReTypePassword && this.employee.ReTypePassword!=null){
        AppComponent.SmartAlert.Errmsg('Password and Re-enter Password must be same');
        this.employee.ReTypePassword=null;
      }
    }
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
