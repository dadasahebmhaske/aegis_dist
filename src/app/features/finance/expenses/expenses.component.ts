import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '@app/features/order/order.service';
import { FinanceService } from '../finance.service';
@Component({
  selector: 'sa-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
      public cpInfo: any = {};
      public transfer: any ={ExpTypeId:'',EmpId:'' };
      public datePickerConfig: Partial<BsDatepickerConfig>;
      public fd = new FormData();
      public filepreview: any;
      public imgUrl: string;
      public loaderbtn: boolean = true;
      public ExpensesTypeData: any = [];
      public selectedFile: File = null;
      public bdata:any=[];
      public EmpData: any = [];
      public bulkDoc: any = {};
      constructor(private appService: AppService, private dataShare: DatashareService,private financeService:FinanceService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
        this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
      }
      ngOnInit() {
        this.appService.getAppData().subscribe(data => { this.cpInfo = data });
        this.allOnLoad();
      }
      allOnLoad() {
        this.financeService.getExpensesType().subscribe((resR: any) => {
          if (resR.StatusCode != 0)
            this.ExpensesTypeData = resR.Data; 
            //this.ExpensesTypeData.push({ExpTypeId:'',ExpType:'Return Amount'});
        });
        this.financeService.getEmpoyee(this.cpInfo.CPCode).subscribe((respD: any) => {
          if (respD.StatusCode != 0)
            this.EmpData = respD.Data;
        });
      }
      onSubmitPayment() {
        if (this.transfer.CreditAmount != null || this.transfer.CreditAmount>0) {
          this.transfer.CPCode = this.cpInfo.CPCode;
          let obj=this.masterService.filterData(this.ExpensesTypeData, this.transfer.ExpTypeId, 'ExpTypeId');
          let typeCheck=obj[0].MstFlag;
          if(typeCheck=='RT'){
            this.transfer.DebitAmount = this.transfer.CreditAmount;
            this.transfer.CreditAmount=0;
            this.transfer.CrDbFlag = 'DB';
          }else{
            this.transfer.DebitAmount = 0;
            this.transfer.CrDbFlag = 'CR';
          }
          this.transfer.IsActive = 'Y';
          this.transfer.UserCode = this.cpInfo.EmpId;
      //this.transfer.CreditAmount = CreditAmount;
      let dataString=JSON.stringify(this.transfer);
      this.fd.append('CipherText', dataString);
            this.loaderbtn=false;
            this.financeService.postExpenses(this.fd).subscribe((resData: any) => {
              this.loaderbtn = true;
              if (resData.StatusCode != 0) {
                AppComponent.Router.navigate(['/finance/expenses-list']);
              } 
              else { AppComponent.SmartAlert.Errmsg(resData.Message); }
            });
      
          } else {
            AppComponent.SmartAlert.Errmsg(`Amount should be greater than 0 `);
          }
    } 
    onFileSelected(event) {
      var reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      this.transfer.ImageName = event.target.files[0].name;
      //this.DocFileName = `${this.cpInfo.EmpId}_${this.DocFileName}`;
      reader.onload = (event: ProgressEvent) => {
        this.filepreview = (<FileReader>event.target).result;
        var f1 = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.'));
        f1 = f1.toString().toLowerCase();
        if (f1 == '.jpg' || f1 == '.png' || f1 == '.gif' || f1 == '.jpeg' || f1 == '.bmp' || f1 == '.txt' || f1 == '.excel' || f1 == '.xlsx' || f1 == '.pdf' || f1 == '.xps') {
          // this.bdata=[];
          // this.bdata.push({
          //   DocId: '',
          //   DocTypId: 1025,
          //   DocFileName: this.transfer.ImageName,
          //   DocNo: '',
          //   IsActive: "Y"
          // });
          this.fd.append(`image`, this.selectedFile, this.transfer.ImageName);    
       
        }
        else {
          $("#fileControl").val('');
          this.filepreview = 'assets/img/avatars/male.png'
          AppComponent.SmartAlert.Errmsg(`Choose only valid file `);
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    // saveDocument() {
    //   if (this.bdata.length > 0 ) {
    //     this.bulkDoc.flag = this.transfer.DocId == null ? 'IN' : 'UP';
    //     this.bulkDoc.RefId = this.transfer.StkOrdId;
    //     this.bulkDoc.FormFlag = 'INV';
    //     this.bulkDoc.UserCode = this.cpInfo.EmpId; 
    //     this.bulkDoc.bdata = this.bdata;
    //     let ciphertext = this.appService.getEncrypted(this.bulkDoc);
    //     this.fd.append('CipherText', ciphertext);
    //     this.masterService.postBulkDoc(this.fd).subscribe((resData: any) => {
    //       this.loaderbtn = true;
    //       if (resData.StatusCode != 0) {
    //         AppComponent.Router.navigate(['/finance/expenses-list']);
    //       }
    //       else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    //     });
    //   } else {
    //     AppComponent.Router.navigate(['/finance/expenses-list']);
    //   }
    // }
   

    }
    