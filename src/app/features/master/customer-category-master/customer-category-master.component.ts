import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-customer-category-master',
  templateUrl: './customer-category-master.component.html',
  styleUrls: ['./customer-category-master.component.css']
})
export class CustomerCategoryMasterComponent implements OnInit {
  custData:any;
  gridOptions:IGridoption;
  constructor(private http:HttpClient) { 
    
  }
  ngOnInit() {
    this.onSubmit()
   this.configureGrid();
   // this.custData=[];
    
  }

  onEditFunction = ($event) =>{
    console.log($event);
   // alert('City: '+$event.City+', Designation: '+$event.Designation+', ID: '+$event.ID+', Name: '+$event.Name)
    $('#myModal').modal('show');
  }

  onSubmit(){
    this.custData =  [{
      "ID": 1,
      "Name": "Kevin",
      "City": "Santa Clara",
      "Address": "Longmen",
      "Designation": "VP Marketing"
    }, {
      "ID": 2,
      "Name": "Tina",
      "City": "São Bartolomeu",
      "Address": "Bojongloa",
      "Designation": "Computer Systems Analyst III"
    }, {
      "ID": 3,
      "Name": "Kevin",
      "City": "Cilolohan",
      "Address": "Tai’an",
      "Designation": "Paralegal"
    }, {
      "ID": 4,
      "Name": "Rebecca",
      "City": "Runović",
      "Address": "Tessaoua",
      "Designation": "Human Resources Manager"
    }, {
      "ID": 5,
      "Name": "Nancy",
      "City": "Merritt",
      "Address": "Yur’yevets",
      "Designation": "Assistant Manager"
    }, {
      "ID": 6,
      "Name": "Anne",
      "City": "Pio Duran",
      "Address": "Kuala Lumpur",
      "Designation": "Sales Representative"
    }, {
      "ID": 7,
      "Name": "Scott",
      "City": "Xiamao",
      "Address": "Banjarmasin",
      "Designation": "Computer Systems Analyst II"
    }];
 
  // this.http.get(`${AppComponent.BaseUrl}Admin/GetCustomerDetails?CustId=&CustName&CompanyName=&IsActive=Y`,{headers:AppComponent.headers}).subscribe(
  //   (response:any)=>{
  //                if(response.StatusCode!=0){
  //                 this.custData=response.Data;              
  //               }                
  //                 } )

   }  

  configureGrid(){
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    
     this.gridOptions.columnDefs = [];
    Object.keys(this.custData[0]).map((key, index) => {
      let gridColumnDefs = <IGridColumnDefs>{}
      gridColumnDefs.field = key;
      gridColumnDefs.cellTemplate = "<div class='ui-grid-cell-contents tooltip-uigrid' title='{{COL_FIELD}}'><a>{{COL_FIELD CUSTOM_FILTERS}}</a></div>"
      this.gridOptions.columnDefs.push(gridColumnDefs);
    });

    // let  columnDefs=[];
    // columnDefs=[
    //    {
    //      name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
    //    , width: "48",
    //      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
    //  },
    //    { name: 'CustId', displayName: 'Cust Id', width:"90", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'CompanyName', displayName: 'Company Name', width:"250", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'FName', displayName: 'First Name', width:"150", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'LName', displayName: 'Last Name', width:"150", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'LicenceKey', displayName: 'Licence Key', width:"180", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'MobileNo', displayName: 'Mobile No.', width:"110", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'ValidFrom', displayName: 'Valid From', width:"*", cellTooltip: true,filterCellFiltered: true},
    //    { name: 'ValidTo', displayName: 'Valid To', width:"*", cellTooltip: true,filterCellFiltered: true},       
    //    // { name: 'IsActive', displayName: 'Active', width: "70", cellTooltip: true, filterCellFiltered: true},   
    //  ]
    //  this.gridOptions.columnDefs=columnDefs;
     
  this. onSubmit();

  }
}
