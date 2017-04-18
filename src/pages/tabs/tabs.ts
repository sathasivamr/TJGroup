import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';


import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any;
  tab2Root: any;
  //params: any;
  about: any
  contact: any;
  constructor(params: NavParams) {

    console.log(params);
    if (params.get('about')) {
      this.about = params.data;
    }
    if (params.get('contact')) {
      this.contact = params.data;
    }
    this.tab1Root = AboutPage;
    this.tab2Root = ContactPage;
  }
}
