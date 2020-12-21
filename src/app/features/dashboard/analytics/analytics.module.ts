import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module'

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { SocialNetworkComponent } from "./live-feeds/social-network.component";
import { LiveFeedsComponent } from "./live-feeds/live-feeds.component";
import { LiveStatsComponent } from "./live-feeds/live-stats.component";
import { RevenueComponent } from "./live-feeds/revenue.component";
import { BirdEyeComponent } from './bird-eye/bird-eye.component';
import { TodoWidgetComponent } from './todo-widget/todo-widget.component';
import { TodoListComponent } from './todo-widget/todo-list.component';
import { FlotChartModule } from "@app/shared/graphs/flot-chart/flot-chart.module";
import { D3Module } from "@app/shared/graphs/d3/d3.module";
import { ChartJsModule } from '@app/shared/graphs/chart-js/chart-js.module';
import { AnalyticsService } from './analytics.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { MorrisGraphModule } from '@app/shared/graphs/morris-graph/morris-graph.module';
@NgModule({
  imports: [
    SharedModule,
    AnalyticsRoutingModule,
    FlotChartModule,
    D3Module,
    ChartJsModule,
    MorrisGraphModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    AnalyticsComponent,
    LiveFeedsComponent,
    LiveStatsComponent,
    RevenueComponent,
    SocialNetworkComponent,
    BirdEyeComponent,
    TodoWidgetComponent,
    TodoListComponent
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {

}
