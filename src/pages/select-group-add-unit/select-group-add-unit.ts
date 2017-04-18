import { WialonFilterService } from '../../service/wialon/wialon-emitter';

import { WialonAPIService } from '../../service/wialon/wialon-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the SelectGroupAddUnit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-group-add-unit',
  templateUrl: 'select-group-add-unit.html'
})
export class SelectGroupAddUnitPage {
  unitDetails: any;
  groupDetails: any;
  groupAndUnit: any = [];
  newlySeleceted: any = [];
  selectedItem: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public wialonAPI: WialonAPIService,
    public loadingCtrl: LoadingController) {
    this.groupAndUnit = [];
    this.newlySeleceted = [];
    this.unitDetails = this.navParams.get('unit');
    this.groupDetails = this.navParams.get('group');

    this.unitDetails.forEach(element => {
      console.log(this.unitDetails);
      let unit = { 'unitID': element.id, 'unitName': element.nm, 'isChecked': false };

      this.groupDetails.unit.forEach(group => {
        if (group.unitID === element.id) {
          unit.isChecked = true;
        }
      });
      if (unit.isChecked) {
        this.groupAndUnit.push(unit);
        this.selectedItem.push(unit.unitID);
      } else {
        this.newlySeleceted.push(unit);
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectGroupAddUnitPage');
  }
  addToGroup(i, unitID) {
    this.selectedItem.push(unitID);
    this.groupAndUnit.push(this.newlySeleceted[i]);
    this.newlySeleceted.splice(i, 1);
    console.log(this.selectedItem);

  }
  removeFromGroup(i, unitID) {
    this.newlySeleceted.push(this.groupAndUnit[i]);
    this.groupAndUnit.splice(i, 1);
    let co = this.selectedItem.indexOf(unitID)
    this.selectedItem.splice(co, 1);
    console.log(this.selectedItem);
  }
  submit() {
    let loader = this.loadingCtrl.create({
      content: "group update started..."
    });

    console.log(this.groupDetails.groupID, this.selectedItem);
    this.wialonAPI.updateGroupUnit(this.groupDetails.groupID, this.selectedItem).then((res) => {
      console.log(res);
      loader.dismiss();
      let loaders = this.loadingCtrl.create({
        content: "updating group details..."
      });
      loaders.present();

      Promise.all([this.wialonAPI.getAllGroup(), this.wialonAPI.getAllUnit()]).then((res) => {
        loaders.dismiss();
        let result = { 'about': true, 'contact': true, 'group': <Object>res[0], 'unit': <Object>res[1] }
        WialonFilterService.getInstance().sendData(result);
        this.navCtrl.pop();
        //this.navCtrl.setRoot(ConfrimationPage, { 'about': true,'contact': true, 'group': <Object>res[0], 'unit': <Object>res[1] });


      }).catch((err) => {
        loaders.dismiss();

        window.alert('try to login again');
        console.log('');
      })
    }).catch((err) => {
      loader.dismiss();

      window.alert('unable to process ur request');
      console.log('');
    })
  }
}
