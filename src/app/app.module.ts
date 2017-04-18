import { WialonFilterService } from '../service/wialon/wialon-emitter';
import { StorageUtility } from '../service/Storage/storage-utill';
import { WialonAPIService } from '../service/wialon/wialon-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SelectUnitAddGroupPage } from '../pages/select-unit-add-group/select-unit-add-group';
import { SelectGroupAddUnitPage } from '../pages/select-group-add-unit/select-group-add-unit';
import { ConfrimationPage } from '../pages/confrimation/confrimation';
import { TabsPage } from '../pages/tabs/tabs';
import { SyncPage } from '../pages/sync/sync';

// import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Ng2PaginationModule } from 'ng2-pagination';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '939b6f14'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SelectUnitAddGroupPage,
    SelectGroupAddUnitPage,
    ConfrimationPage, SyncPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    Ng2PaginationModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SelectUnitAddGroupPage,
    SelectGroupAddUnitPage, ConfrimationPage, SyncPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WialonAPIService,
    StorageUtility,
    WialonFilterService

  ]
})
export class AppModule { }
