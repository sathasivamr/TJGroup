import { WialonFilterService } from '../../service/wialon/wialon-emitter';

import { WialonAPIService } from '../../service/wialon/wialon-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/*
  Generated class for the SelectUnitAddGroup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-unit-add-group',
  templateUrl: 'select-unit-add-group.html'
})
export class SelectUnitAddGroupPage {
  unitDetails: any;
  groupDetails: any;
  groupedItem: any = [];
  unGroupedItem: any = [];
  selectedItem: any = [];
  requstData: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public wialonAPI: WialonAPIService,
    public loadingCtrl: LoadingController) {
    this.groupedItem = [];
    this.unGroupedItem = [];
    this.unitDetails = this.navParams.get('unit');
    this.groupDetails = this.navParams.get('group');
    console.log(this.groupDetails, this.unitDetails);


    this.groupDetails.forEach(element => {
      console.log(this.unitDetails);
      let groupDet = { 'groupID': element.id, 'groupName': element.nm, 'isChecked': false };

      this.unitDetails.group.forEach(group => {
        if (group.groupID === element.id) {
          groupDet.isChecked = true;
        }
      });
      if (groupDet.isChecked) {
        this.groupedItem.push(groupDet);
        this.selectedItem.push(groupDet.groupID);
      } else {
        this.unGroupedItem.push(groupDet);
      }

    });

  }
  addGroup(i, groupID) {
    this.selectedItem.push(groupID);
    this.groupedItem.push(this.unGroupedItem[i]);
    this.unGroupedItem.splice(i, 1);
    console.log(groupID);
    console.log(this.selectedItem);
  }

  removeGroup(i, groupID) {
    this.unGroupedItem.push(this.groupedItem[i]);
    this.groupedItem.splice(i, 1);
    let co = this.selectedItem.indexOf(groupID)
    this.selectedItem.splice(co, 1);
    console.log(groupID);
    console.log(this.selectedItem);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectUnitAddGroupPage');
  }


  submit() {
    let loaders = this.loadingCtrl.create({
      content: "updating group details it's may teke few seconds don't press back..."
    });
    loaders.present();
    let count = 0;
    this.groupDetails.forEach(group => {

      let flag = false;
      this.selectedItem.forEach(element => {
        if (element === group.id) {
          flag = true;
        }
      });

      if (flag) {
        if (this.groupDetails[count].u.indexOf(this.unitDetails.unitID) >= 0) {
        } else {
          this.groupDetails[count].u.push(this.unitDetails.unitID);
        }
      } else {
        if (this.groupDetails[count].u.indexOf(this.unitDetails.unitID) >= 0) {
          let pos = this.groupDetails[count].u.indexOf(this.unitDetails.unitID);
          this.groupDetails[count].u.splice(pos, 1);
        }
      }
      this.requstData[count] = this.wialonAPI.updateGroupUnit(group.id, this.groupDetails[count].u).then((res) => {
        console.log(res);

      }).catch((err) => {
        window.alert('unable to process ur request');
        console.log('');
      })
      count++;
    });


    Promise.all([this.requstData[count - 1]]).then((res) => {
      loaders.setContent('Getting your data');
      Promise.all([this.wialonAPI.getAllGroup(), this.wialonAPI.getAllUnit()]).then((res) => {
        loaders.dismiss();
        let result = { 'about': true, 'contact': true, 'group': <Object>res[0], 'unit': <Object>res[1] }
        WialonFilterService.getInstance().sendData(result);
        this.navCtrl.pop();
      }).catch((err) => {
        loaders.dismiss();
        window.alert('group details updated but session expired. close the app and login again');
        console.log('');
      })
    }).catch((err) => {
      loaders.dismiss();
      window.alert('unable to process your request');
      console.log('');
    })
  }
}
