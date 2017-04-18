import { WialonFilterService } from '../../service/wialon/wialon-emitter';
import { SelectUnitAddGroupPage } from '../select-unit-add-group/select-unit-add-group';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { SyncPage } from '../../pages/sync/sync';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  unitDetails: any;
  groupDetails: any;
  unitDetailsAndGroupDetails: any = [];
  oldunitDetailsAndGroupDetails: any = [];
  shownGroup = null;
  unitOutSide: boolean = false;
  isGet: boolean = true;
  constructor(public navCtrl: NavController, public params: NavParams) {
    WialonFilterService.getInstance().filterDataEvent.subscribe(data => {
      if (data) {
        console.log('about', data);
        this.unitDetails = [];
        this.groupDetails = [];
        this.isGet = false;
        this.unitDetails = data.unit;
        this.groupDetails = data.group;
        this.optimize();
      }
    });
    if (this.isGet) {
      this.unitDetails = [];
      this.groupDetails = [];
      this.unitDetails = this.params.get('unit');
      this.groupDetails = this.params.get('group');
      this.optimize();
    }

  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  Sample(i) {
    window.alert('Hello');
  }

  /**
   * this wll make the 
   */
  optimize() {
    this.unitDetailsAndGroupDetails = [];
    this.oldunitDetailsAndGroupDetails = [];
    this.unitDetails.forEach(unit => {

      let count = 0;
      let group = {
        'unitName': unit.nm,
        'account': unit.bact,
        'unitID': unit.id,
        'img': unit.uri,
        'groupLength': 0,
        'group': [

        ]
      }
      this.groupDetails.forEach(element => {

        element.u.forEach(unitnumber => {
          if (unitnumber === unit.id) {
            group.group.push({ 'groupName': element.nm, 'groupID': element.id });
            this.unitDetails[count].gd = 'SUCCESS';
            group.groupLength = 1;
          }
        });
      });
      count++;
      this.unitDetailsAndGroupDetails.push(group);
    });
    console.log(this.unitDetailsAndGroupDetails)
    this.oldunitDetailsAndGroupDetails = this.unitDetailsAndGroupDetails;
    //   this.groupDetails.forEach(element => {
    //     let group = {
    //       'unitName': element.nm,
    //       'unitID': element.bact,
    //       'groupID': element.id,
    //       'groupLength': 0,
    //       'group': [

    //       ]
    //     }
    //     element.u.forEach(unitnumber => {
    //       let count = 0;
    //       this.unitDetails.forEach(unit => {
    //         if (unitnumber === unit.id) {
    //           group.group.push({ 'groupName': unit.nm, 'groupID': unit.id });
    //           this.unitDetails[count].gd = 'SUCCESS';
    //           group.groupLength = 1;
    //         }
    //         count++;
    //       });

    //     });
    //     this.groupDetailsAndUnitDetails.push(group);
    //   });
    //   let group = {
    //     'groupName': 'Vehicle Out Side Group',
    //     'groupID': '',
    //     'unitLength': 0,
    //     'unit': [
    //     ]
    //   }
    //   this.unitDetails.forEach(unit => {
    //     if (unit.gd != 'SUCCESS') {
    //       this.unitOutSide = true;
    //       group.unit.push({ 'unitName': unit.nm, 'unitID': unit.id });
    //       group.unitLength = 1;
    //     }

    //   });
    //   this.groupDetailsAndUnitDetails.push(group);
    //   console.log(this.groupDetailsAndUnitDetails);
  }

  searchEvent(ev: any) {
    // Reset items back to all of the items
    let val = ev.target.value;
    this.unitDetailsAndGroupDetails = this.oldunitDetailsAndGroupDetails;

    if (val && val.trim() != '') {

      let temp = [];
      this.oldunitDetailsAndGroupDetails.forEach(element => {
        let flag = false;
        if (element.unitName.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          flag = true;
        } else {
          element.group.forEach(group => {
            if (group.groupName.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              flag = true;
            }
          });
        }
        if (flag) {
          temp.push(element);
        }
      });
      this.unitDetailsAndGroupDetails = temp;
    }
  }

  addOrRemoveUnit(unitDetails) {
    if (this.groupDetails.length >= 1) {
      if (unitDetails) {
        this.navCtrl.push(SelectUnitAddGroupPage, { 'unit': unitDetails, 'group': this.groupDetails });
      }
    } else {
      window.alert('There is no groups avilable. create the group from http://new.tigerjump.in/');
    }


  }
referesh(){
  this.navCtrl.push(SyncPage);
}
  
}
