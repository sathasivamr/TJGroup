
import { StorageUtility } from '../Storage/storage-utill';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WialonAPIService {

    //arrayUnit = new Array<AllUnit>();
    hostUrl: any = "https://hst-api.wialon.com/wialon/ajax.html?";

    constructor(public http: Http, public storage: StorageUtility) { }

    getAllUnit(): Promise<any> {
        return this.getSID().then((res) => {
            let getunit: any = `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&sid=` + res + `&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"","propType":""},"force":1,"flags":4611686018427387903,"from":0,"to":0}`;
            return this.http.post(getunit, null).toPromise().then(resp => {
                return Promise.resolve<any>(resp.json().items);
            }).catch((err) => {
                this.storage.clearStorage();
                return Promise.reject<any>('');
            });
        }).catch((err) => {
            this.storage.clearStorage();
            return Promise.reject<any>('');
        });
    }

    getAllGroup(): Promise<any> {
        return this.getSID().then((res) => {
            let getunit: any = `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&sid=` + res + `&params={"spec":{"itemsType":"avl_unit_group","propName":"sys_name","propValueMask":"*","propType":"","sortType":"sys_name"},"force":1,"flags":4611686018427387903,"from":0,"to":0}`;
            return this.http.post(getunit, null).toPromise().then(resp => {
                return Promise.resolve<any>(resp.json().items);
            }).catch((err) => {
                this.storage.clearStorage();
                return Promise.reject<any>('');
            });
        }).catch((err) => {
            this.storage.clearStorage();
            return Promise.reject<any>('');
        });
    }

    getSID(): Promise<any> {
        return this.storage.getJwtFromStorage().then((jwt) => {
            jwt = '"' + jwt + '"';
            //let jwt = '"' + '7372316b6f3efac814792d0cf8f917892CD05633058438D24C824214D6BFC66596F20D0E' + '"';
            let siteURL: any = this.hostUrl + "svc=token/login&params={\"token\":" + jwt + "}";
            console.log(siteURL)
            return this.http.post(siteURL, null).toPromise().then(resp => {
                console.log(resp);
                return Promise.resolve<any>(resp.json().eid);
            }).catch((err) => {
                this.storage.clearStorage();
                return Promise.reject<any>('');
            });
        }).catch((err) => {
            this.storage.clearStorage();
            return Promise.reject<any>('');
        });
    }


    updateGroupUnit(groupID, units) {
        return this.getSID().then((res) => {
            let getunit: any = `https://hst-api.wialon.com/wialon/ajax.html?svc=unit_group/update_units&sid=` + res + `&params={"itemId":` + groupID + `,"units":[` + units + `]}`;
            console.log(getunit);
            return this.http.post(getunit, null).toPromise().then(resp => {
                return Promise.resolve<any>(resp.json());
            }).catch((err) => {
                this.storage.clearStorage();
                return Promise.reject<any>('');
            });
        }).catch((err) => {
            this.storage.clearStorage();
            return Promise.reject<any>('');
        });
    }
}
