import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from "@angular/router";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UpgradeModule,setAngularLib } from "@angular/upgrade/static";
import { initUiGrid } from './uigrid';
import * as angular from 'angular';

setAngularLib(angular);

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

  initUiGrid();
  
  platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.documentElement, ['uigridmodule']);
    upgrade.ngZone.run(() => {
      upgrade.injector.get(Router).initialNavigation();
    });
  });