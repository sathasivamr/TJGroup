import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Confrimation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confrimation',
  templateUrl: 'confrimation.html'
})
export class ConfrimationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  
    this.navCtrl.setRoot(TabsPage, { 'about': true,'contact': true, 'group': this.navParams.get('group'), 'unit': this.navParams.get('unit') });
  }

}
