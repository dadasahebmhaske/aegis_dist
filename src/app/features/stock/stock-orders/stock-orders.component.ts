import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '@app/features/customer/customer.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
@Component({
  selector: 'sa-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.css']
})
export class StockOrdersComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  public product: any = {};
  public productSegmentData: any = [];
  public productDataSelected: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private dataShare: DatashareService, private masterService: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => this.product = data == null ? { ProdSegId: '', ProdId: '' } : data);
    this.allOnLoad()
  }
  allOnLoad() {
    this.masterService.getProductSegmentDetails().subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data;
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
  ngOnDestroy() {
    this.dataShare.updateShareData(null);
  }

}
