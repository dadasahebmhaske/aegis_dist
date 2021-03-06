import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../order.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
@Component({
  selector: 'sa-refill-booking',
  templateUrl: './refill-booking.component.html',
  styleUrls: ['./refill-booking.component.css']
})
export class RefillBookingComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public cust: any = {};
  public custData: any = {};
  public preLoadCust: any = [];
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public delBoyData: any = [];
  public disQty: boolean = false;
  public btnAction: string;
  public hideaddrow: boolean = true;
  public loaderbtn: boolean = true;
  public product: any = { ProdSegId: '', ProdId: '' };
  public ProductArray: any = [];
  public productSegmentData: any = []; ProdSegArray: any = [];
  public productDataSelected: any = [];
  public productDataPriceAllocation: any = [];
  public removeProductUpdate: any = [];
  public selectedValue: any;
  public selectedOption: any;
  public SearchBy: String = 'NewConsNo';
  public noResult = false;
  constructor(private appService: AppService, private dataShare: DatashareService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {

      this.cust = data == null ? { AllocatedUserCode: '', IsActive: 'Y' } : data;

      if (this.cust.ConsNo != null) {
        this.hideaddrow = false;
        this.btnAction = 'Cancel Booking';
      } else {
        this.btnAction = 'Book Now';
        this.hideaddrow = true;
      }
      this.orderService.getRefillBookingProducts(this.cpInfo.CPCode, this.cust.BookRefNo).subscribe((resp: any) => {
        if (resp.StatusCode != 0) {
          this.ProductArray = resp.Data;
          // this.cust = this.orderService.calculateQtyGTotalRefillB(this.cust, this.ProductArray);
        }
      });
    });
    this.allOnLoad();
  }
  allOnLoad() {
    this.masterService.getProductSegmentDetails(this.cpInfo.ChannelId).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data; console.log(this.productSegmentData);
    });
    this.masterService.getEmpoyeeDelBoy(this.cpInfo.CPCode).subscribe((respD: any) => {
      if (respD.StatusCode != 0)
        this.delBoyData = respD.Data;
    });
    this.customerService.getCustomer(this.cpInfo.CPCode, '', '', '', '').subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.preLoadCust = resData.Data; console.log(this.preLoadCust);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onSelectProdSegment() {
    if (this.cust.ConsNo == null) { AppComponent.SmartAlert.Errmsg("Please verify customer first"); }
    else {
      this.product.ProdId = '';
      this.product.SVQty = '';
      this.product.ProdRate = '';
      this.orderService.getCPPriceAllocation(this.cpInfo.CPCode, this.product.ProdSegId, this.cust.ConsId).subscribe((resCPA: any) => {
        if (resCPA.StatusCode != 0) {
          this.productDataSelected = resCPA.Data;
        } else { this.productDataSelected = []; }
      });
    }
  }

  onSelectProduct() {
    let docobj;
    docobj = this.masterService.filterData(this.productSegmentData, this.product.ProdSegId, 'ProdSegId');
    this.product.ProdSeg = docobj[0].ProdSeg;//extra
    docobj = this.masterService.filterData(this.productDataSelected, this.product.ProdId, 'ProdId');
    // this.product.ProdRate = docobj[0].DepositAmount;
    this.product.ProdRate = docobj[0].Price;
    this.product.Product = docobj[0].Product; //extra
    this.product.ProdCode = docobj[0].ProductCode;
    this.product.SVQty = docobj[0].SVQty;
    // this.product.IgstPer = (docobj[0].IgstPer == null || docobj[0].IgstPer == undefined || docobj[0].IgstPer == '') ? 0 : docobj[0].IgstPer;
    // this.product.CgstPer = (docobj[0].CgstPer == null || docobj[0].CgstPer == undefined || docobj[0].CgstPer == '') ? 0 : docobj[0].CgstPer;
    // this.product.SgstPer = (docobj[0].SgstPer == null || docobj[0].SgstPer == undefined || docobj[0].SgstPer == '') ? 0 : docobj[0].SgstPer;

    this.product.BookProdId = '';
    this.product.BookNo = '';

    if (this.product.ProdQty != null) {
      this.product.RefillAmount = (parseInt(this.product.ProdRate) + parseInt(this.product.PremiumCharge == null || this.product.PremiumCharge == '' ? 0 : this.product.PremiumCharge)) * parseInt(this.product.ProdQty);
      // if (this.cpInfo.IsHomeState == 'Y') {
      //   this.product.CgstAmt = parseInt(this.product.ProdAmt) * (parseInt(this.product.CgstPer) / 100);
      //   this.product.SgstAmt = parseInt(this.product.ProdAmt) * (parseInt(this.product.SgstPer) / 100);
      //   this.product.GrandTotal = parseInt(this.product.ProdAmt) + (parseInt(this.product.CgstAmt) + parseInt(this.product.SgstAmt));
      //   this.product.IgstAmt = 0;
      // } else {
      //   this.product.IgstAmt = parseInt(this.product.ProdAmt) * (parseInt(this.product.IgstPer) / 100);
      //   this.product.GrandTotal = parseInt(this.product.ProdAmt) + (parseInt(this.product.IgstAmt));
      //   this.product.CgstAmt = this.product.SgstAmt = 0;
      // }
      this.product.Discount = (parseFloat(this.product.RefillAmount) * parseFloat(this.cust.DiscountPer == null ? 0 : this.cust.DiscountPer)) / 100
      this.product.AmountPayable = parseFloat(this.product.RefillAmount) - parseFloat(this.product.Discount);

    }
    // this.product.OrderCode = '';
    // this.product.CouponCode = '';
    // this.product.DiscountAmt = '';
    // this.product.TranCharges = '';
    this.product.IsActive = 'Y';
  }
  addProduct() {
    if (this.cust.ConsNo == null)
      AppComponent.SmartAlert.Errmsg("Please verify customer first");
    else
      if (this.ProductArray.some(obj => parseInt(obj.ProdId) === parseInt(this.product.ProdId))) {
        AppComponent.SmartAlert.Errmsg("Product is already added in list.");
        this.product = { ProdSegId: '', ProdId: '' };
      } else {
        this.ProductArray.push(this.product);
        this.cust = this.orderService.calculateQtyGTotalRefillB(this.cust, this.ProductArray);
        this.product = { ProdSegId: '', ProdId: '' };
        //this.onDiscountAdd();
      }
  }
  onRemoveProduct(data, index) {
    if (data.ConsNo != '') {
      data.IsActive = 'N';
      this.removeProductUpdate.push(data);
    }
    this.ProductArray.splice(index, 1);
    this.cust = this.orderService.calculateQtyGTotalRefillB(this.cust, this.ProductArray);
    //this.onDiscountAdd();
  }

  onEditProduct(data, index) {
    if (data.ConsNo != '') {
      this.product = data;
    }
  }
  onEditDiscount() {
    this.cust.TotalAmtPayable = parseInt(this.cust.RefillAmount) - parseInt(this.cust.Discount == null || this.cust.Discount == '' ? 0 : this.cust.Discount);
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.cust = Object.assign(this.cust, this.selectedOption);
    let filtrArray;
    if (this.cust.CustTypeName == 'ALL' || this.cust.ProdSegId == null) {
      this.ProdSegArray = this.productSegmentData;
    } else {
      filtrArray = this.masterService.filterData(this.productSegmentData, this.cust.ProdSegId, 'ProdSegId');
      this.ProdSegArray = filtrArray;
    }

  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
  onGetCustomer() {
    this.loaderbtn = false;
    this.product = { ProdSegId: '', ProdId: '' };
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.customerService.getCustomer(this.cpInfo.CPCode, '', '', this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.cust = Object.assign(this.cust, resData.Data[0]);
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onDiscountAdd() {
    this.cust.TotalAmtPayable = parseInt(this.cust.TotalAmt);
    this.cust.TotalAmtPayable = parseInt(this.cust.TotalAmtPayable) - (parseInt(this.cust.Discount == null || this.cust.Discount == '' ? 0 : this.cust.Discount));
  }
  onSubmitBooking() {
    if (this.cust.BookRefNo == null) {
      if (this.ProductArray.length > 0 || this.removeProductUpdate.length > 0) {
        this.loaderbtn = false;
        //this.cust.PendingAmt = '';
        this.cust.CPCode = this.cpInfo.CPCode;
        this.cust.BookStatus = 2;
        this.cust.Lat = '';
        this.cust.Lon = '';
        this.cust.IsActive = 'Y'
        this.cust.UserCode = this.cpInfo.EmpId;
        this.cust.Flag = "IN";
        // this.cust.BookNo = '';
        // this.cust.Remarks = '';
        //this.cust.BookType = '';
        this.cust.ImeiNo = '';
        // this.cust.TransfStatus = '';
        this.cust.Apptype = "DI";
        // if (this.removeProductUpdate.length > 0) {
        //   this.ProductArray = this.ProductArray.concat(this.removeProductUpdate);
        // }
        this.cust.data = this.ProductArray;
        this.orderService.postRefillBooking(this.cust).subscribe((resData: any) => {
          this.loaderbtn = true;
          if (resData.StatusCode != 0) {
            AppComponent.SmartAlert.Success(resData.Message);
            this.ProductArray = [];
            AppComponent.Router.navigate(['/order/refill-booking-list']);
          }
          else { AppComponent.SmartAlert.Errmsg(resData.Message); }
        });



      } else {
        AppComponent.SmartAlert.Errmsg(`Please add atleast one product.`);
      }
    }
    else {
      this.cust = { 'BookRefNo': this.cust.BookRefNo, 'ConsId': this.cust.ConsId, 'UserCode': this.cpInfo.EmpId, 'CancelReason': this.cust.CancelReason }
      let ciphertext = this.appService.getEncrypted(this.cust);
      this.orderService.postCancelBooking(ciphertext).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/order/refill-booking-list']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
  }
  makequantitydisable() {
    let docobj;
    docobj = this.masterService.filterData(this.productSegmentData, this.product.ProdSegId, 'ProdSegId');
    if (docobj.length > 0)
      if ((docobj[0].ProdSeg).toUpperCase() == 'DOMESTIC') {
        this.product.ProdQty = 1;
        this.disQty = true;
      } else {
        this.disQty = false;
      }
  }
  ngOnDestroy() {
    this.dataShare.updateShareData(null);
  }

}
