import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '@app/features/customer/customer.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import Swal from 'sweetalert2'
@Component({
  selector: 'sa-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.css']
})
export class StockOrdersComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public minDate: Date;
  public loaderbtn: boolean = true;
  public orderTypeData: any = [];
  public product: any = { OrderType: '', ProdSegId: '', ProdId: '' };
  public ProductArray: any = [];
  public plantData: any = [];
  public productSegmentData: any = [];
  public productDataSelected: any = [];
  public removeProductUpdate: any = [];
  public stock: any = { OrderStage: 'PE', VehicleId: '', PlantId: '', OrderType: '', IsActive: 'Y' };
  public vehicleData: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private dataShare: DatashareService, private masterService: MasterService, private stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {
      this.stock = data == null ? { OrderStage: 'PE', VehicleId: '', PlantId: '', OrderType: '', IsActive: 'Y', OrderDt: new Date() } : data;
      //this.stock.OrderDt = new Date(this.stock.OrderDt);
      this.stockService.getStockOrderProductDetails(this.cpInfo.CPCode, this.stock.StkOrdId, this.stock.OrderNo, '', '').subscribe((resp: any) => {
        if (resp.StatusCode != 0) {
          this.ProductArray = resp.Data;
          this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
        }
      });
    });
    this.allOnLoad();
  }
  allOnLoad() {
    this.masterService.getProductSegmentDetails().subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data;
    });
    this.masterService.getVehicles(this.cpInfo.CPCode).subscribe((resV: any) => {
      if (resV.StatusCode != 0) {
        this.vehicleData = resV.Data;
      }
    });
    this.stockService.getPlantDetails(this.cpInfo.CPCode).subscribe((resPl: any) => {
      if (resPl.StatusCode != 0) {
        this.plantData = resPl.Data;
      }
    });
    this.stockService.getOrderType().subscribe((resOD: any) => {
      if (resOD.StatusCode != 0) {
        this.orderTypeData = resOD.Data;
      }
    });
  }
  onSelectProdSegment() {
    if (this.stock.PlantId == undefined || this.stock.PlantId == null || this.stock.PlantId == '') {
      this.product.ProdSegId = '';
      AppComponent.SmartAlert.Errmsg(`Please select plant first`);
    } else {
      if (this.product.OrderType != null)
        this.product.ProdType = this.product.OrderType == 'RO' || this.product.OrderType == 'DR' ? 'F' : 'E';
      this.masterService.getNewProducts(this.cpInfo.CPCode, this.stock.PlantId, this.product.ProdSegId, this.product.ProdType).subscribe((resPT: any) => {
        if (resPT.StatusCode != 0) {
          this.productDataSelected = resPT.Data;
        } else { this.productDataSelected = []; }
      });
    }

  }
  onSelectProduct() {
    let docobj;
    docobj = this.masterService.filterData(this.plantData, this.stock.PlantId, 'PlantId');
    let plantStateCode = docobj[0].StateCode;
    if (plantStateCode == null || plantStateCode == undefined || plantStateCode == '') {
      Swal.fire({
        title: '',
        text: 'Plant Address not added on system. Please contact to admin!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
      })
    } else {
      docobj = this.masterService.filterData(this.orderTypeData, this.product.OrderType, 'MstFlag');
      this.product.OrderTypeName = docobj[0].Name;//extra
      docobj = this.masterService.filterData(this.productSegmentData, this.product.ProdSegId, 'ProdSegId');
      this.product.ProdSeg = docobj[0].ProdSeg;//extra
      docobj = this.masterService.filterData(this.productDataSelected, this.product.ProdId, 'ProdId');
      this.product.ProdRate = docobj[0].ProdPrice;
      this.product.Product = docobj[0].Product; //extra
      this.product.ProdCode = docobj[0].ProductCode;
      this.product.IgstPer = (docobj[0].IgstPer == null || docobj[0].IgstPer == undefined || docobj[0].IgstPer == '') ? 0 : docobj[0].IgstPer;
      this.product.CgstPer = (docobj[0].CgstPer == null || docobj[0].CgstPer == undefined || docobj[0].CgstPer == '') ? 0 : docobj[0].CgstPer;
      this.product.SgstPer = (docobj[0].SgstPer == null || docobj[0].SgstPer == undefined || docobj[0].SgstPer == '') ? 0 : docobj[0].SgstPer;
      if (this.product.OrderType != 'RO') {
        this.product.IgstPer = 0;
        this.product.CgstPer = 0;
        this.product.SgstPer = 0;
      }
      if (this.product.ProdQty != null) {
        this.product.ProdAmt = parseInt(this.product.ProdRate) * parseInt(this.product.ProdQty);
        if (parseInt(this.cpInfo.StateCode) == parseInt(plantStateCode)) {
          this.product.CgstAmt = parseInt(this.product.ProdAmt) * (parseInt(this.product.CgstPer) / 100);
          this.product.SgstAmt = parseInt(this.product.ProdAmt) * (parseInt(this.product.SgstPer) / 100);
          this.product.GrandTotal = parseInt(this.product.ProdAmt) + (parseInt(this.product.CgstAmt) + parseInt(this.product.SgstAmt));
          this.product.IgstAmt = 0;
        } else {
          this.product.IgstAmt = parseInt(this.product.ProdAmt) * (parseInt(this.product.IgstPer) / 100);
          this.product.GrandTotal = parseInt(this.product.ProdAmt) + (parseInt(this.product.IgstAmt));
          this.product.CgstAmt = this.product.SgstAmt = 0;
        }
        this.product.SubTotal = parseInt(this.product.ProdAmt);
        if (this.product.OrderType == 'ER' || this.product.OrderType == 'DR') { this.product.GrandTotal = 0; this.product.SubTotal = 0; }
        if (this.product.OrderType == 'NC') {
          this.product.RefundRate = this.product.ProdRate;
          this.product.RefundAmt = parseInt(this.product.RefundRate) * parseInt(this.product.ProdQty);
        } else { this.product.RefundRate = 0; }
      }
      this.product.OrderCode = '';
      this.product.CouponCode = '';
      this.product.DiscountAmt = '';
      this.product.TranCharges = '';
      this.product.IsActive = 'Y';
    }

  }
  addProduct() {
    if (this.ProductArray.some(obj => parseInt(obj.ProdId) === parseInt(this.product.ProdId)) && this.ProductArray.some(obj => obj.OrderType === this.product.OrderType)) {
      AppComponent.SmartAlert.Errmsg("Product is already added in list.");
      this.product = { OrderType: '', ProdSegId: '', ProdId: '' };
    } else {
      this.ProductArray.push(this.product);
      this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
      this.product = { OrderType: '', ProdSegId: '', ProdId: '' };
    }
  }
  onRemoveProduct(data, index) {
    if (data.OrderCode != '') {
      data.IsActive = 'N';
      this.removeProductUpdate.push(data);
    }
    this.ProductArray.splice(index, 1);
    this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
  }
  // calculateQtyGTotal() {
  //   this.stock.GrandTotal = this.stock.QtyTotal = this.stock.SubTotal = this.stock.IgstTotal = this.stock.CgstTotal = this.stock.SgstTotal = 0;
  //   if (this.ProductArray.length != 0)
  //     for (let i = 0; i < this.ProductArray.length; i++) {
  //       this.stock.GrandTotal = parseInt(this.stock.GrandTotal) + parseInt(this.ProductArray[i].GrandTotal);
  //       this.stock.QtyTotal = parseInt(this.stock.QtyTotal) + parseInt(this.ProductArray[i].ProdQty);
  //       this.stock.SubTotal = parseInt(this.stock.SubTotal) + parseInt(this.ProductArray[i].SubTotal);
  //       this.stock.IgstTotal = parseInt(this.stock.IgstTotal) + parseInt(this.ProductArray[i].IgstAmt);
  //       this.stock.CgstTotal = parseInt(this.stock.CgstTotal) + parseInt(this.ProductArray[i].CgstAmt);
  //       this.stock.SgstTotal = parseInt(this.stock.SgstTotal) + parseInt(this.ProductArray[i].SgstAmt);
  //     }
  // }
  onSubmitOrder() {
    if (this.ProductArray.length > 0 || this.removeProductUpdate.length > 0) {
      this.loaderbtn = false;
      this.stock.StkOrdId = this.stock.StkOrdId == null || this.stock.StkOrdId == '' ? '' : this.stock.StkOrdId;
      this.stock.OrderNo = this.stock.OrderNo == null || this.stock.OrderNo == '' ? '' : this.stock.OrderNo;
      this.stock.OrderCode = this.stock.OrderCode == null || this.stock.OrderCode == '' ? '' : this.stock.OrderCode;
      this.stock.CPCode = this.cpInfo.CPCode;
      this.stock.ProdAmt = this.stock.SubTotal
      this.stock.DiscountAmt = '';
      //this.stock.SubTotal
      //this.stock.GrandTotal    
      this.stock.OrderType = "WB";
      this.stock.UserCode = this.cpInfo.EmpId;
      this.stock.Flag = this.stock.StkOrdId == null || this.stock.StkOrdId == '' ? "IN" : "UP";
      if (this.removeProductUpdate.length > 0) {
        this.ProductArray = this.ProductArray.concat(this.removeProductUpdate);
      }
      this.stock.data = this.ProductArray;
      this.stockService.postBulkOrders(this.stock).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.ProductArray = [];
          AppComponent.Router.navigate(['/stock/stock-orders-list']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one product.`);
    }
  }
  ngOnDestroy() {
    this.dataShare.updateShareData(null);
  }

}
