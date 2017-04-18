import { WialonFilterService } from '../../service/wialon/wialon-emitter';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
//import { SelectUnitAddGroupPage } from '../pages/select-unit-add-group/select-unit-add-group';
import { SelectGroupAddUnitPage } from '../../pages/select-group-add-unit/select-group-add-unit';
import { SyncPage } from '../../pages/sync/sync';
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ContactPage {

  unitDetails: any;
  groupDetails: any;
  groupDetailsAndUnitDetails: any = [];
  shownGroup = null;
  unitOutSide: boolean = false;
  oldgroupDetailsAndUnitDetails: any = [];
  page: number = 1;
  isGet: boolean = true;
  public maxSize: number = 4;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  // public config: PaginationInstance =[]

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };






  constructor(public navCtrl: NavController, public params: NavParams) {


    WialonFilterService.getInstance().filterDataEvent.subscribe(data => {

      if (data) {
        console.log('contact', data);
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

  addOrRemoveUnit(groupDetails) {
    if (groupDetails) {
      this.navCtrl.push(SelectGroupAddUnitPage, { 'group': groupDetails, 'unit': this.unitDetails });
    }

  }

  /**
   * this wll make the 
   */
  optimize() {
    this.groupDetailsAndUnitDetails = [];
    this.oldgroupDetailsAndUnitDetails = [];
    this.groupDetails.forEach(element => {
      let group = {
        'groupName': element.nm,
        'accountNumber': element.bact,
        'groupID': element.id,
        'img': element.uri,
        'unitLength': 0,
        'paginate': { itemsPerPage: 1, currentPage: 1 },
        'unit': [

        ]
      }
      element.u.forEach(unitnumber => {
        let count = 0;
        this.unitDetails.forEach(unit => {
          if (unitnumber === unit.id) {
            group.unit.push({ 'unitName': unit.nm, 'unitID': unit.id });
            this.unitDetails[count].gd = 'SUCCESS';
            group.unitLength = 1;
          }
          count++;
        });

      });
      this.groupDetailsAndUnitDetails.push(group);
    });
    // let group = {
    //   'groupName': 'Vehicle Out Side Group',
    //   'groupID': '',
    //   'unitLength': 0,
    //   'unit': [
    //   ]
    // }
    // this.unitDetails.forEach(unit => {
    //   if (unit.gd != 'SUCCESS') {
    //     this.unitOutSide = true;
    //     group.unit.push({ 'unitName': unit.nm, 'unitID': unit.id });
    //     group.unitLength = 1;
    //   }

    // });
    //this.groupDetailsAndUnitDetails.push(group);
    console.log(this.groupDetailsAndUnitDetails);
    this.oldgroupDetailsAndUnitDetails = this.groupDetailsAndUnitDetails;
  }



  searchEvent(ev: any) {
    // Reset items back to all of the items
    let val = ev.target.value;
    this.groupDetailsAndUnitDetails = this.oldgroupDetailsAndUnitDetails;
    if (val && val.trim() != '') {

      let temp = [];
      this.oldgroupDetailsAndUnitDetails.forEach(element => {
        let flag = false;
        if (element.groupName.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          flag = true;
        } else {
          element.unit.forEach(units => {
            if (units.unitName.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              flag = true;
            }
          });
        }
        if (flag) {
          temp.push(element);
        }
      });
      this.groupDetailsAndUnitDetails = temp;
    }
  }

  onPageChange(number: number, pos) {
    console.log('change to page', number);
    this.groupDetailsAndUnitDetails[pos].currentPage = number;
  }
  referesh() {
    this.navCtrl.push(SyncPage);
  }
}
