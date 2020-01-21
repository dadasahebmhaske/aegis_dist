import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-resend-dac',
  templateUrl: './resend-dac.component.html',
  styleUrls: ['./resend-dac.component.css']
})
export class ResendDacComponent implements OnInit {
  public state: any = {
    tabs: {
      demo1: 0,
      demo2: 'tab-r1',
      demo3: 'hr1',
      demo4: 'AA',
      demo5: 'iss1',
      demo6: 'l1',
      demo7: 'tab1',
      demo8: 'hb1',
      demo9: 'A1',
      demo10: 'is1'
    }}
    private customerData: any=[];
    private gridOptions: IGridoption;
      constructor() {
    }
    ngOnInit() {
      this.configureGrid();
    }
    configureGrid() {
      this.gridOptions = <IGridoption>{}
      this.gridOptions.exporterMenuPdf = false;
      this.gridOptions.exporterExcelFilename = 'Customer list.xlsx';
      let columnDefs = [];
      columnDefs = [
     
        { name: 'CustCode', displayName: 'Customer Code', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'CustName', displayName: 'Customer Name', width: "*", cellTooltip: true, filterCellFiltered: true },
        { name: 'MobileNo', displayName: 'Mobile No.', width: "120", cellTooltip: true, filterCellFiltered: true },
    ]
      this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    onEditFunction = ($event) => {
      // console.log($event.row);
      //AppComponent.Router.navigate(['/stock/stock-orders']);
    }
    onLoad() {
      this.customerData = [{
      'CustCode': 'D32659812' ,
      'CustName': "Chandreashekhar Naydu" ,
      'MobileNo': 9874563214,

      },{
        'CustCode': 'D985647895' ,
        'CustName': "Sharuk Ali khan" ,
        'MobileNo': 8884563214,
    
        }];
      // this.masters.getVehicles().subscribe(resData:any=>{      
      //   if(resData.StatusCode!=0){
      // this.vehicleData=resData.Data;
      //     AppComponent.SmartAlert.Success(resData.Message);
      // }
      //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
      // }); 
    }
  
  }