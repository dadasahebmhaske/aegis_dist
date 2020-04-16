import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import { AppService } from '@app/core/custom-services/app.service';


@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  public CPSD: any;
  public stockShow:boolean;
  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => {
      this.CPSD = data;
      this.stockShow=(this.CPSD.ChannelTypeFlag=='DI'|| this.CPSD.ChannelTypeFlag=='DE') ?true:false;
    });
  }

}
