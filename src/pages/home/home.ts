


import { TabsPage } from '../tabs/tabs';
import { StorageUtility } from '../../service/Storage/storage-utill';
import { WialonAPIService } from '../../service/wialon/wialon-service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StorageUtility]

})
export class HomePage implements OnInit {

  id: any;
  count: number = 1;
  browsers: any;
  browser: any = undefined;
  logout: boolean = false;
  storage: any

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public wialonAPI: WialonAPIService, public _storage: StorageUtility,
    public loadingCtrl: LoadingController) {
    this.storage = _storage;

  }

  ngOnInit() {
    this.checkCookie();


  }
  checkCookie() {

    this.storage.getJwtFromStorage().then((jwt) => {
      console.log('get', jwt);
      if (jwt && jwt != '') {
        this.logout = true;
      } else {
        this.logout = false;
      }

    }).catch((err) => {
      console.log('error', err);
    })
  }

  getStart() {
    // let loader = this.loadingCtrl.create({
    //   content: "Getting your Data..."
    // });
    // Promise.all([this.wialonAPI.getAllGroup(), this.wialonAPI.getAllUnit()]).then((res) => {
    //   loader.dismiss();
    //   this.navCtrl.setRoot(TabsPage, { 'about': true, 'contact': true, 'group': <Object>res[0], 'unit': <Object>res[1] });
    // });
    this.storage.getJwtFromStorage().then((jwt) => {
      if (jwt && jwt != '') {
        this.logout = true;
        let loader = this.loadingCtrl.create({
          content: "Getting your Data..."
        });
        loader.present();
        Promise.all([this.wialonAPI.getAllGroup(), this.wialonAPI.getAllUnit()]).then((res) => {
          loader.dismiss();
          this.navCtrl.setRoot(TabsPage, { 'about': true, 'contact': true, 'group': <Object>res[0], 'unit': <Object>res[1] });
        });
      } else {
        this.battleInit();
        this.id = setInterval(() => {
          this.battleInit();
        }, 1000);
      }
    }).catch((err) => {
      console.log('error', err);
    })

  }

  battleInit() {

    if (this.browser === undefined && this.count == 1) {
      this.count = 2;
      this.browser = window.open("http://new.tigerjump.in/login.html?access_type=-1", "_self", "location=no");
    } else if (this.count == 2) {
      let that = this;

      this.browser.addEventListener('loadstop', function (event) {
        let urlToken: string = event.url;
        let isFound: number = urlToken.indexOf('svc_error=0');
        if (isFound > 100 && that.count != 3) {
          clearInterval(that.id);
          that.count = 3;
          that.browser.close();
          let token = urlToken.substring(48, 120);
          that.logout = true;
          let inside = that;
          that.storage.setJwtInStorage(token).then(res => {
            inside.navCtrl.setRoot(HomePage);
          });
        }
      });
      if (that.count === 2) {
        this.browser.addEventListener('exit', function (e) {
          clearInterval(that.id);
          that.navCtrl.setRoot(HomePage);
        }, false);
      }
    }
  }

  logoutMethod() {
    this.storage.clearStorage().then((res) => {
      this.checkCookie();
    }).catch((err) => {
      this.checkCookie();
    });
  }

}


