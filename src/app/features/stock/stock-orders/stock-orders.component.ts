import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '@app/features/customer/customer.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
@Component({
  selector: 'sa-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.css']
})
export class StockOrdersComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  public product: any = {};
  ProductArray: any = [];
  public plantData: any = [];
  public productSegmentData: any = [];
  public productDataSelected: any = [];
  public removeProductUpdate: any = [];
  public stock: any = { VehicleId: '', PlantId: '' };
  public vehicleData: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private dataShare: DatashareService, private masterService: MasterService, private stockService: StockService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => this.product = data == null ? { OrderType: '', ProdSegId: '', ProdId: '' } : data);
    this.allOnLoad()
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
    this.stockService.getPlantDetails().subscribe((resPl: any) => {
      if (resPl.StatusCode != 0) {
        this.plantData = resPl.Data;
      }
    });
    // this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA: any) => {
    //   if (reSA.StatusCode != 0) {
    //     this.SubAreaArray = reSA.Data;
    //   }
    // });
  }

  onSelectProdSegment() {
    this.masterService.getProducts(this.product.ProdSegId).subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.productDataSelected = resPT.Data;
      } else { this.productDataSelected = []; }
    });
  }
  onSelectProduct() {
    let docobj;
    docobj = this.masterService.filterData(this.productSegmentData, this.product.ProdSegId, 'ProdSegId');
    this.product.ProdSeg = docobj[0].ProdSeg;//extra
    docobj = this.masterService.filterData(this.productDataSelected, this.product.ProdId, 'ProdId');
    this.product.ProdRate = docobj[0].DepositAmount;
    this.product.Product = docobj[0].Product; //extra
    this.product.ProdCode = docobj[0].ProdCode;
    if (this.product.ProdQty != null) {
      this.product.ProdAmt = parseInt(this.product.ProdRate) * parseInt(this.product.ProdQty);
      this.product.IgstPer = 0;
      this.product.CgstPer = 9;
      this.product.SgstPer = 9;
      this.product.IgstAmt = 0;
      this.product.CgstAmt = parseInt(this.product.ProdAmt) * 0.09;
      this.product.SgstAmt = parseInt(this.product.ProdAmt) * 0.09;
      this.product.SubTotal = parseInt(this.product.ProdAmt) - (parseInt(this.product.CgstAmt) + parseInt(this.product.SgstAmt));
      this.product.GrandTotal = this.product.ProdAmt;
    }
    this.product.OrderCode = '';
    this.product.CouponCode = '';
    this.product.DiscountAmt = '';
    this.product.TranCharges = '';
    this.product.IsActive = 'Y';
    //this.product.OrderType = 'Refill Order';//extra
  }
  addProduct() {
    this.ProductArray.push(this.product);
    this.calculateQtyGTotal();
    this.product = { OrderType: '', ProdSegId: '', ProdId: '' };
  }
  onRemoveProduct(data, index) {
    if (data.OrderCode != '') {
      data.IsActive = 'N';
      this.removeProductUpdate.push(data);
    }
    this.ProductArray.splice(index, 1);
    this.calculateQtyGTotal();
  }
  calculateQtyGTotal() {
    this.stock.GrandTotal = this.stock.QtyTotal = 0;
    if (this.ProductArray.length != 0)
      for (let i = 0; i < this.ProductArray.length; i++) {
        this.stock.GrandTotal = parseInt(this.stock.GrandTotal) + parseInt(this.ProductArray[i].GrandTotal);
        this.stock.QtyTotal = parseInt(this.stock.QtyTotal) + parseInt(this.ProductArray[i].ProdQty);
      }

  }
  ngOnDestroy() {
    this.dataShare.updateShareData(null);
  }

}
