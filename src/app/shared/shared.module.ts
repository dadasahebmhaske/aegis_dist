import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SmartadminLayoutModule } from "./layout";

import {I18nModule} from "./i18n/i18n.module";
import { UserModule } from "./user/user.module";
import { BootstrapModule } from "@app/shared/bootstrap.module";
import {VoiceControlModule} from "./voice-control/voice-control.module";

import {SmartadminWidgetsModule} from "./widgets/smartadmin-widgets.module";

import {UtilsModule} from "./utils/utils.module";
import {PipesModule} from "./pipes/pipes.module";
import {ChatModule} from "./chat/chat.module";
import {StatsModule} from "./stats/stats.module";
import {InlineGraphsModule} from "./graphs/inline/inline-graphs.module";
import {SmartadminFormsLiteModule} from "./forms/smartadmin-forms-lite.module";
import {SmartProgressbarModule} from "./ui/smart-progressbar/smart-progressbar.module";
import { CalendarComponentsModule } from "@app/shared/calendar/calendar-components.module";
import {CommonDirDirective} from '../core/directive/common-dir.directive';
import {UppercaseDirective} from '../core/directive/uppercase.directive';
import { TrueFalseValueDirective } from '../core/directive/true-false-value.directive';
import { ConfirmEqualValidatorDirective } from "@app/core/directive/confirm-equal-validator.directive";
import { NewpassNotEqualValidatorDirective } from "@app/core/directive/newpass-not-equal-validator";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    SmartadminLayoutModule,
    BootstrapModule
  ],
  declarations: [CommonDirDirective,UppercaseDirective,TrueFalseValueDirective,ConfirmEqualValidatorDirective,NewpassNotEqualValidatorDirective],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,

    UserModule,
    SmartadminLayoutModule,
    BootstrapModule,

    I18nModule,

    UtilsModule,
    PipesModule,

    SmartadminFormsLiteModule,

    SmartProgressbarModule,

    InlineGraphsModule,

    SmartadminWidgetsModule,

    ChatModule,

    StatsModule,

    VoiceControlModule,

    CalendarComponentsModule,
    CommonDirDirective,
    UppercaseDirective,
    TrueFalseValueDirective,
    ConfirmEqualValidatorDirective,
    NewpassNotEqualValidatorDirective
  ]
})
export class SharedModule {}
